import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { dbGetConnection } from '../../database.js';

import dotenv from 'dotenv';
dotenv.config();

const userLogin = async (req: Request, res: Response) => {
    try {
        const { 
            name,
            password
        } = req.body;

        if (!name || !password) {
            return res.status(400).json({success: false, message: 'Не все поля заполнены!'});
        }

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ name });

        if (!user) {
            return res.status(409).json({success: false, message: 'Пользователь не найден'});
        }

        const isValid = bcrypt.compareSync(password, user["hash"]);

        if (!isValid) {
            return res.status(401).json({success: false, message: 'Пароль неверный!'});
        }

        const token = jwt.sign({ 
            'id': user._id,
            'name': user.name,
            'mail': user.mail 
        }, process.env.JWT_SECRET, { expiresIn: '3d' });

        console.log(`[DONE]: User logined, ID: ${user._id}`);
        return res.status(201).json({"success": true, "token": token});

    } catch (error) {
        console.error('[ERROR][userLogin]: ', error);
        return res.status(500).json({success: false, message: 'Ошибка сервера!'});
    }
};

export {userLogin}