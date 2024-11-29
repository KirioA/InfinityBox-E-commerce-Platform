import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import './database.js';

import { userLogin } from './routes/user/userLogin.js';
import { userRegister } from './routes/user/userRegister.js';
import { userCheck } from './routes/user/userCheck.js';
import { authenticateJWT } from './utils/JWT.js';
import { userUpdate } from './routes/user/userUpdate.js';
import { userFetchData } from './routes/user/userFetchData.js';
import { userVerifyPassword } from './routes/user/userVerifyPassword.js';
import { userUpdatePassword } from './routes/user/userUpdatePassword.js';
import { userUploadAvatar, upload } from './routes/user/userUploadAvatar.js';
import { addAddress } from './routes/user/userAddAdress.js';
import { deleteAddress } from './routes/user/userDeleteAdress.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appPort = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
http://localhost:3000/

// Раздача статических файлов для аватаров
app.use('/uploads', express.static(path.resolve('uploads')));
console.log('[INFO] Serving static files from /uploads');

// Убедитесь, что SERVER_URL настроен в .env
console.log(`[INFO] SERVER_URL: ${process.env.SERVER_URL}`);

// Основные эндпоинты
app.get('/api', (req, res) => {
  res.json({ fruits: ['apple', 'strawberry', 'pineapple'] });
});

app.post('/api/v1/user/register', userRegister);
app.post('/api/v1/user/login', userLogin);
app.post('/api/v1/user/check', userCheck);
app.get('/api/v1/user/fetchdata', authenticateJWT, userFetchData);
app.post('/api/v1/user/update', authenticateJWT, userUpdate);
app.post('/api/v1/user/verify-password', authenticateJWT, userVerifyPassword);
app.post('/api/v1/user/update-password', authenticateJWT, userUpdatePassword);
app.post('/api/v1/user/add-address', authenticateJWT, addAddress);
app.delete('/api/v1/user/delete-address/:addressId', authenticateJWT, deleteAddress);

// Новый эндпоинт для загрузки аватарки
app.post(
    '/api/v1/user/upload-avatar',
    authenticateJWT,
    upload.single('avatar'),
    userUploadAvatar
);

app.listen(appPort, () => {
  console.log(`Server is running on http://localhost:${appPort}`);
});
