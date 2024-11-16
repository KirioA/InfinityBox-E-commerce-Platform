import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { dbGetConnection } from '../../database.js';

import dotenv from 'dotenv';
dotenv.config();

const userRegister = async (req: Request, res: Response) => {
    try {
        const { 
            name,
            mail,
            password
        } = req.body;

        if (!name || !mail || !password) {
            return res.status(400).json({success: false, message: 'Не все поля заполнены!'});
        }

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const db = await dbGetConnection();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({
            $or: [
              { name },
              { mail }
            ]
        });

        if (user) {
            return res.status(409).json({success: false, message: 'Пользователь с таким именем уже есть!'});
        }

        const result = await usersCollection.insertOne({
            name, mail, hash
        });
            
        const token = jwt.sign({ 
            'id': result.insertedId,
            'name': name, 
            'mail': mail 
        }, process.env.JWT_SECRET, { expiresIn: '3d' });

        console.log(`[DONE]: User create, ID: ${result.insertedId}`);
        return res.status(201).json({"success": true, "token": token});
        
    } catch (error) {
        console.error('[ERROR][userRegister]: ', error);
        return res.status(500).json({success: false, message: 'Ошибка сервера!'});
    }
};

export {userRegister}