import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { dbGetConnection } from '../../database.js';

// Конфигурация multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve('uploads/images');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Формат изображения не поддерживается!'));
        }
    },
}).single('image');

// Интерфейс продукта для типизации
interface Product {
    _id?: ObjectId;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock?: number;
    netWeight?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Получение всех продуктов
export const getProducts = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();
        const productsCollection = db.collection('products');
        const products = await productsCollection.find({}).toArray();

        return res.status(200).json({
            success: true,
            data: products.map(product => ({
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                imageUrl: product.imageUrl,
                stock: product.stock || 0,
                netWeight: product.netWeight,
                status: product.status,
            })),
        });
    } catch (error) {
        console.error('[ERROR][getProducts]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Получение продукта по ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID продукта!' });
        }

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Продукт не найден!' });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                imageUrl: product.imageUrl,
                stock: product.stock || 0,
                netWeight: product.netWeight,
                status: product.status,
            },
        });
    } catch (error) {
        console.error('[ERROR][getProductById]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Добавление нового продукта с загрузкой изображения
export const addProduct = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: 'Ошибка загрузки файла!', error: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: 'Ошибка обработки файла!', error: err.message });
        }

        const { name, description, price, category, stock = 0, netWeight, status = 'active' } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Не все обязательные поля заполнены!',
                requiredFields: ['name', 'description', 'price', 'category', 'image'],
            });
        }

        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : '';

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');

        const newProduct: Product = {
            name,
            description,
            price: parseFloat(price),
            category,
            imageUrl,
            stock: parseInt(stock, 10),
            netWeight: netWeight ? parseFloat(netWeight) : undefined,
            status,
            createdAt: new Date(),
        };

        const result = await productsCollection.insertOne(newProduct);

        console.log(`[DONE]: Product added, ID: ${result.insertedId}`);
        return res.status(201).json({
            success: true,
            message: 'Продукт добавлен!',
            productId: result.insertedId,
        });
    });
};

// Обновление продукта с возможностью замены изображения
export const updateProductById = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: 'Ошибка загрузки файла!', error: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: 'Ошибка обработки файла!', error: err.message });
        }

        const { id } = req.params;
        const { name, description, price, category, stock, netWeight, status } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID продукта!' });
        }

        const updatedFields: Partial<Product> = {};

        if (name !== undefined) updatedFields.name = name;
        if (description !== undefined) updatedFields.description = description;
        if (price !== undefined) updatedFields.price = parseFloat(price);
        if (category !== undefined) updatedFields.category = category;
        if (stock !== undefined) updatedFields.stock = parseInt(stock, 10);
        if (netWeight !== undefined) updatedFields.netWeight = parseFloat(netWeight);
        if (status !== undefined) updatedFields.status = status;

        if (req.file) {
            updatedFields.imageUrl = `/uploads/images/${req.file.filename}`;
        }

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');

        const result = await productsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updatedFields, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: 'Продукт не найден!' });
        }

        console.log(`[DONE]: Product updated, ID: ${id}`);
        return res.status(200).json({ success: true, message: 'Данные продукта обновлены!' });
    });
};

// Удаление продукта
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID продукта!' });
        }

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');
        const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Продукт не найден!' });
        }

        console.log(`[DONE]: Product deleted, ID: ${id}`);
        return res.status(200).json({ success: true, message: 'Продукт удалён!' });
    } catch (error) {
        console.error('[ERROR][deleteProduct]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};
