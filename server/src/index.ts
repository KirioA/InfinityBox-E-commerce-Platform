import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import './database.js';

import { userRegister } from './routes/auth/userRegister.js';
import { exit } from 'process';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DB_URI || !process.env.JWT_SECRET) {
  console.error("[.env]: the file is incomplete, add the fields!");
  exit(1);
}

const app = express();
const appPort = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "strawberry", "pineapple"] });
});

app.post('/api/v1/user/register', userRegister);

app.listen(appPort, () => {
  console.log(`Server is running on http://localhost:${appPort}`);
});
