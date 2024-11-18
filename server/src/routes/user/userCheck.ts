import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const userCheck = async (req: Request, res: Response) => {
    try {
        const { 
            token
        } = req.body;

        if (!token) {
            return res.status(400).json({success: false, message: 'Ошибка авторизации.'});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({success: false, message: 'Ошибка авторизации, токен устарел.'});
            }

            console.log(`[DONE]: User login checked, ID: ${decoded.id}`);
            return res.status(201).json({"success": true, "token": token});
        })
    } catch (error) {
        console.error('[ERROR][userCheck]: ', error);
        return res.status(500).json({success: false, message: 'Ошибка сервера!'});
    }
};

export {userCheck}