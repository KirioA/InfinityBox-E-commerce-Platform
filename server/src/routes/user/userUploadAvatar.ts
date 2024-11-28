import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Настройка хранилища multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve('uploads/avatars');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log(`[INFO] Directory created: ${uploadDir}`);
        } else {
            console.log(`[INFO] Directory exists: ${uploadDir}`);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileName = `${uniqueSuffix}-${file.originalname}`;
        console.log(`[INFO] Generated file name: ${fileName}`);
        cb(null, fileName);
    },
});

const upload = multer({ storage });

const userUploadAvatar = async (req: Request, res: Response) => {
    console.log('[INFO] Received request for avatar upload');

    try {
        const { id } = req.user; // Получаем ID пользователя из JWT
        console.log(`[INFO] User ID from JWT: ${id}`);

        if (!id) {
            console.error('[ERROR] User ID is missing in token');
            return res.status(400).json({ success: false, message: 'User ID is missing in token' });
        }

        if (!req.file) {
            console.error('[ERROR] No file uploaded in request');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const avatarPath = `/uploads/avatars/${req.file.filename}`;
        console.log(`[INFO] File saved at: ${avatarPath}`);

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Проверяем существование пользователя в базе данных
        const objectId = new ObjectId(id);
        const user = await usersCollection.findOne({ _id: objectId });

        if (!user) {
            console.error('[ERROR] User not found in database');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log(`[INFO] User found: ${JSON.stringify(user)}`);

        // Обновляем путь к аватару
        const updateResult = await usersCollection.updateOne(
            { _id: objectId },
            { $set: { profilePicture: avatarPath } }
        );

        if (updateResult.modifiedCount === 0) {
            console.error('[ERROR] Avatar path not updated in database');
            return res.status(500).json({ success: false, message: 'Avatar not updated in database' });
        }

        console.log(`[INFO] Avatar updated in database for user ID: ${id}`);
        return res.status(200).json({
            success: true,
            message: 'Avatar uploaded and updated successfully',
            avatarPath: `${process.env.SERVER_URL}${avatarPath}`, // Убедитесь, что это правильный путь
        });
    } catch (error) {
        console.error('[ERROR] Unexpected error during avatar upload:', error);
        return res.status(500).json({ success: false, message: 'Server error occurred' });
    }
};

export { userUploadAvatar, upload };
