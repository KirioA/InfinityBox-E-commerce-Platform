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
            return res.status(400).send('Не все поля заполнены!');
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
            return res.status(409).send('Пользователь с таким именем уже есть!');
        }

        await usersCollection.insertOne({
            name, mail, hash
        });
            
        const result = await usersCollection.insertOne(user);
        const token = jwt.sign({ 
            'id': result.insertedId,
            'name': name, 
            'mail': mail 
        }, process.env.JWT_SECRET, { expiresIn: '3d' });

        console.log(`[DONE]: Пользователь добавлен с ID: ${result.insertedId}`);
        return res.status(201).send('Пользователь успешно зарегистрирован!').json({"success": true, "token": token});
        
    } catch (error) {
        console.error('[ERROR][userRegister]: ', error);
        return res.status(500).send('Ошибка сервера.');
    }
};

export {userRegister}