import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';
export const deleteAddress = async (req: Request, res: Response) => {

    try {
        const { id } = req.user;
        const { addressId } = req.params;

        if (!addressId) {
            return res.status(400).json({ success: false, message: 'ID адреса не предоставлен' });
        }

        const objectId = new ObjectId(id);
        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        const result = await usersCollection.updateOne(
            { _id: objectId },
            { $pull: { addresses: { id: new ObjectId(addressId) } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({ success: false, message: 'Не удалось удалить адрес' });
        }

        const updatedUser = await usersCollection.findOne({ _id: objectId }, { projection: { addresses: 1 } });

        res.status(200).json({ success: true, addresses: updatedUser?.addresses });
    } catch (error) {
        console.error('[ERROR][deleteAddress]: ', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};
