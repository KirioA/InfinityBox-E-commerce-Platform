import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

export const addAddress = async (req: Request, res: Response) => {
    try {
        console.log('[LOG][upsertAddress]: Function invoked');

        const { id } = req.user;
        const { street, city, postalCode, country } = req.body;

        console.log('[LOG][upsertAddress]: Received user ID:', id);
        console.log('[LOG][upsertAddress]: Received address data:', { street, city, postalCode, country });

        // Валидация данных
        if (!street || typeof street !== 'string' || street.trim() === '') {
            return res.status(400).json({ success: false, message: 'Улица указана некорректно' });
        }
        if (!city || typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ success: false, message: 'Город указан некорректно' });
        }
        if (!postalCode || typeof postalCode !== 'string' || postalCode.trim() === '') {
            return res.status(400).json({ success: false, message: 'Индекс указан некорректно' });
        }
        if (!country || typeof country !== 'string' || country.trim() === '') {
            return res.status(400).json({ success: false, message: 'Страна указана некорректно' });
        }

        const objectId = new ObjectId(id);
        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Обновляем или вставляем новый адрес в массив адресов
        console.log('[LOG][upsertAddress]: Replacing addresses...');
        const result = await usersCollection.updateOne(
            { _id: objectId },
            {
                $set: {
                    addresses: [{
                        street: street.trim(),
                        city: city.trim(),
                        postalCode: postalCode.trim(),
                        country: country.trim(),
                    }]
                }
            }
        );

        console.log('[LOG][upsertAddress]: Update result:', result);

        if (result.modifiedCount === 0) {
            return res.status(500).json({ success: false, message: 'Не удалось обновить адрес' });
        }

        // Возвращаем обновленный список адресов
        console.log('[LOG][upsertAddress]: Fetching updated addresses...');
        const updatedUser = await usersCollection.findOne(
            { _id: objectId },
            { projection: { addresses: 1 } }
        );

        console.log('[LOG][upsertAddress]: Updated addresses:', updatedUser?.addresses);

        res.status(200).json({ success: true, addresses: updatedUser?.addresses });
    } catch (error) {
        console.error('[ERROR][upsertAddress]:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};
