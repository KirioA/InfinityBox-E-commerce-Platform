import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

import { dbGetConnection } from '../../database.js';

const userVerifyPassword = async (req: Request, res: Response) => {
    try {
        const { oldPassword } = req.body;  // Получаем старый пароль из тела запроса
        if (!oldPassword) {
            return res.status(400).json({ success: false, message: 'Пароль не был предоставлен' });
        }

        // Получаем ID пользователя из токена
        const { id } = req.user;

        // Преобразуем строковый ID в ObjectId
        const objectId = new ObjectId(id);

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Ищем пользователя в базе данных
        const user = await usersCollection.findOne({ _id: objectId });
        console.log('[INFO] Received oldPassword:', oldPassword);
        console.log('[INFO] User found:', user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        // Сравниваем старый пароль с хэшированным паролем в базе данных
        const isValidPassword = bcrypt.compareSync(oldPassword, user.hash);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Неверный пароль' });
        }

        return res.status(200).json({ success: true, message: 'Пароль верен' });
    } catch (error) {
        console.error('[ERROR][userVerifyPassword]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
}

export { userVerifyPassword };
