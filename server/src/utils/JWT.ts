import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authenticateJWT = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};

export { authenticateJWT };
