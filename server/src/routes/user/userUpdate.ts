import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { dbGetConnection } from '../../database.js';

const userUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;  
        const { name, mail, password } = req.body;

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ _id: id });

        if (!user) {
            return;
        }

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const result = await usersCollection.updateOne(
            { _id: id },
            {
                $set: {
                    name: name ?? user.name, 
                    mail: mail ?? user.mail,
                    hash: password ? hash : user.hash 
                }
            }
        );

        if (!result.modifiedCount) {
            return res.status(400).json({success: false, message: 'Ошибка обновления данных!'});
        } 

        return res.status(201).json({success: true, message: "Информация обновлена!"});
    } catch (error) {
        console.error('[ERROR][userRegister]: ', error);
        return res.status(500).json({success: false, message: 'Ошибка сервера!'});
    }
}

export { userUpdate }