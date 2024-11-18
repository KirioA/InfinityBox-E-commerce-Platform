import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { dbGetConnection } from '../../database.js';

const userFetchData = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ _id: id });

        if (!user) {
            return;
        }

        return res.status(201).json({
            success: true,
            message: user.name ?? "None",
            mail: user.mail ?? "None",
            firstName: user.firstName ?? "None",
            lastName: user.lastName ?? "None",
            phone: user.phone ?? "None",
            bonusPoints: user.bonusPoints ?? "None",
            status: user.status ?? "None",
            createdAt: user.createdAt ?? "None",
            profilePicture: user.profilePicture ?? "None",
            address: {
                street: user.address.street ?? "None",
                city: user.address.city ?? "None",
                postalCode: user.address.postalCode ?? "None",
                country: user.address.country ?? "None",
            }
        });
    } catch (error) {
        console.error('[ERROR][userRegister]: ', error);
        return res.status(500).json({success: false, message: 'Ошибка сервера!'});
    }
}

export { userFetchData }