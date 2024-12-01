// userUpdatePersonalInfo.ts

import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

export const userUpdatePersonalInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.user; // Получаем id пользователя из JWT
        const { firstName, lastName, phoneNumber } = req.body;
        console.log(phoneNumber)

        // Валидация данных
        if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
            return res.status(400).json({ success: false, message: 'Имя указано некорректно' });
        }
        if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
            return res.status(400).json({ success: false, message: 'Фамилия указана некорректно' });
        }
        if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.trim().length < 10) {
            return res.status(400).json({ success: false, message: 'Номер телефона указан некорректно' });
        }

        const objectId = new ObjectId(id);
        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Обновляем личные данные пользователя
        const result = await usersCollection.updateOne(
            { _id: objectId },
            {
                $set: {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    phone: phoneNumber.trim(),
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({ success: false, message: 'Не удалось обновить данные' });
        }

        // Возвращаем обновленные данные пользователя
        const updatedUser = await usersCollection.findOne({ _id: objectId }, { projection: { firstName: 1, lastName: 1, phoneNumber: 1 } });

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('[ERROR][userUpdatePersonalInfo]:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};
