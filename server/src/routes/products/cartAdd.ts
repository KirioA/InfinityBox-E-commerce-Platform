import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

export const addCart = async (req: Request, res: Response) => {
    try {
        console.log('[LOG][addCart]: Function invoked');

        const { id } = req.user; // Извлекаем ID пользователя из JWT
        const { cart } = req.body; // Получаем корзину из тела запроса

        console.log('[LOG][addCart]: Received user ID:', id);
        console.log('[LOG][addCart]: Received cart data:', cart);

        // Проверка на корректность данных
        if (!Array.isArray(cart)) {
            return res.status(400).json({ success: false, message: 'Корзина должна быть массивом товаров' });
        }

        const objectId = new ObjectId(id);
        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Обновляем корзину пользователя в базе данных
        const result = await usersCollection.updateOne(
            { _id: objectId },
            {
                $set: {
                    cart: cart,
                }
            }
        );

        console.log('[LOG][addCart]: Update result:', result);

        if (result.modifiedCount === 0) {
            return res.status(500).json({ success: false, message: 'Не удалось обновить корзину' });
        }

        // Возвращаем обновленную корзину
        console.log('[LOG][addCart]: Fetching updated cart...');
        const updatedUser = await usersCollection.findOne(
            { _id: objectId },
            { projection: { cart: 1 } }
        );

        console.log('[LOG][addCart]: Updated cart:', updatedUser?.cart);

        res.status(200).json({ success: true, cart: updatedUser?.cart });
    } catch (error) {
        console.error('[ERROR][addCart]:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};
