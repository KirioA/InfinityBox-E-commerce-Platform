import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

// Получение всех продуктов
export const getProducts = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();
        const productsCollection = db.collection('products');
        const products = await productsCollection.find({}).toArray();

        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('[ERROR][getProducts]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Добавление нового продукта
export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        if (!name || !description || !price || !category || !imageUrl) {
            return res.status(400).json({ success: false, message: 'Не все поля заполнены!' });
        }

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');

        const result = await productsCollection.insertOne({
            name,
            description,
            price,
            category,
            imageUrl,
            createdAt: new Date()
        });

        console.log(`[DONE]: Product added, ID: ${result.insertedId}`);
        return res.status(201).json({ success: true, message: 'Продукт добавлен!' });
    } catch (error) {
        console.error('[ERROR][addProduct]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
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
