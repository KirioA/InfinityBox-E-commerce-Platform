import { Request, Response } from 'express';
import { dbGetConnection } from '../../database.js';

import { ObjectId } from 'mongodb';

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        if (!userId || !ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing User ID' });
        }

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await usersCollection.deleteOne({ _id: new ObjectId(userId) });

        return res.status(200).json({
            success: true,
            message: 'User successfully deleted',
            userId,
        });
    } catch (error) {
        console.error('[ERROR][deleteUser]:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { deleteUser };
