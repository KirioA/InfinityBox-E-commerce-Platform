import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

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
                status: product.status
            }))
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
                status: product.status
            }
        });
    } catch (error) {
        console.error('[ERROR][getProductById]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Обновление продукта по ID
export const updateProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            netWeight,
            status
        } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID продукта!' });
        }

        const updatedFields: Partial<Product> = {};

        // Проверка и добавление каждого поля
        if (name !== undefined) updatedFields.name = name;
        if (description !== undefined) updatedFields.description = description;
        if (price !== undefined) updatedFields.price = price;
        if (category !== undefined) updatedFields.category = category;
        if (imageUrl !== undefined) updatedFields.imageUrl = imageUrl;
        if (stock !== undefined) updatedFields.stock = stock;
        if (netWeight !== undefined) updatedFields.netWeight = netWeight;
        if (status !== undefined) updatedFields.status = status;

        // Проверка наличия полей для обновления
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ success: false, message: 'Не переданы данные для обновления!' });
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
    } catch (error) {
        console.error('[ERROR][updateProductById]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Добавление нового продукта
export const addProduct = async (req: Request, res: Response) => {
    try {
        const {
            name,
            description,
            price,
            category,
            imageUrl,
            stock = 0,
            netWeight,
            status = 'active'
        } = req.body;

        // Проверка обязательных полей
        if (!name || !description || !price || !category || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Не все обязательные поля заполнены!',
                requiredFields: ['name', 'description', 'price', 'category', 'imageUrl']
            });
        }

        const db = await dbGetConnection();
        const productsCollection = db.collection('products');

        const newProduct: Product = {
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            netWeight,
            status,
            createdAt: new Date()
        };

        const result = await productsCollection.insertOne(newProduct);

        console.log(`[DONE]: Product added, ID: ${result.insertedId}`);
        return res.status(201).json({
            success: true,
            message: 'Продукт добавлен!',
            productId: result.insertedId
        });
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