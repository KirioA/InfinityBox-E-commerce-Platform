import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

const userUpdatePassword = async (req: Request, res: Response) => {
    try {
        const { newPassword } = req.body; // Получаем новый пароль из тела запроса
        if (!newPassword) {
            return res.status(400).json({ success: false, message: 'Новый пароль не был предоставлен' });
        }

        const { id } = req.user;

        // Преобразуем строковый ID в ObjectId
        const objectId = new ObjectId(id);

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Ищем пользователя в базе данных
        const user = await usersCollection.findOne({ _id: objectId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        console.log('[INFO] User found:', user);

        // Генерация нового хэша для пароля
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        // Обновляем пароль пользователя
        const result = await usersCollection.updateOne(
            { _id: objectId },
            { $set: { hash: hashedPassword } }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({ success: false, message: 'Не удалось обновить пароль' });
        }

        console.log('[INFO] Password updated successfully for user:', user.name);

        return res.status(200).json({ success: true, message: 'Пароль обновлен успешно' });
    } catch (error) {
        console.error('[ERROR][userUpdatePassword]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};

export { userUpdatePassword };
