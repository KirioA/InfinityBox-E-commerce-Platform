import { Request, Response } from 'express';
import { dbGetConnection } from '../../database.js';

// Получение статистики для админ-панели
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();

        // Получение общего количества пользователей
        const usersCollection = db.collection('users');
        const totalUsers = await usersCollection.countDocuments();

        // Получение общего количества продуктов
        const productsCollection = db.collection('products');
        const totalProducts = await productsCollection.countDocuments();

        // Получение общего количества категорий
        // const categoriesCollection = db.collection('categories');
        // const totalCategories = await categoriesCollection.countDocuments();
        const totalCategories = 0;

        // Получение статистики по продажам
        // const salesCollection = db.collection('orders');
        const salesCollection = 0;

        // Получение количества завершённых заказов
        // const totalSales = await salesCollection.countDocuments({ status: 'completed' });
        const totalSales = 0;
        // Получение общего дохода от завершённых заказов
        // const totalRevenue = await salesCollection.aggregate([
        //     { $match: { status: 'completed' } }, // Фильтруем завершённые заказы
        //     { $group: { _id: null, total: { $sum: '$totalAmount' } } } // Суммируем значение totalAmount
        // ]).toArray();

        // const revenue = totalRevenue[0]?.total || 0; // Если доход существует, берем его, если нет - 0
        const revenue = 0;
        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalCategories,
                totalSales,
                totalRevenue: revenue
            }
        });
    } catch (error) {
        console.error('[ERROR][getDashboardStats]: ', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};
