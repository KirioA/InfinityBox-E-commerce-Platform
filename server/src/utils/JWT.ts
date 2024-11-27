import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authenticateJWT = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403); // Токен не найден
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Декодированный токен
        console.log('Decoded token:', decoded); // Логируем декодированный токен
        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return res.sendStatus(403); // Ошибка при верификации токена
    }
};


export { authenticateJWT };
