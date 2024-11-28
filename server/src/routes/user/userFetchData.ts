import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

const userFetchData = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;

        // Преобразуем строковый id в ObjectId
        const objectId = new ObjectId(id);

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ _id: objectId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userAddress = user.address || {};

        // Возвращаем путь к аватару, указывая только на серверную часть
        return res.status(200).json({
            success: true,
            message: user.name ?? "None",
            mail: user.mail ?? "None",
            firstName: user.firstName ?? "None",
            lastName: user.lastName ?? "None",
            phone: user.phone ?? "None",
            bonusPoints: user.bonusPoints ?? "None",
            status: user.status ?? "None",
            createdAt: user.createdAt ?? "None",
            // Здесь изменяем путь, чтобы он начинался от корня, а не от SERVER_URL
            profilePicture: user.profilePicture ? `${user.profilePicture}` : "None",
            address: {
                street: userAddress.street ?? "None",
                city: userAddress.city ?? "None",
                postalCode: userAddress.postalCode ?? "None",
                country: userAddress.country ?? "None",
            }
        });
    } catch (error) {
        console.error('[ERROR][userFetchData]: ', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { userFetchData };
