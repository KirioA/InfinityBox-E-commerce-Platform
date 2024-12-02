import { Request, Response } from 'express';
import { dbGetConnection } from '../../database.js';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        // Получаем всех пользователей из коллекции
        const users = await usersCollection.find({}).toArray();

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('[ERROR][getAllUsers]: ', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getAllUsers };
