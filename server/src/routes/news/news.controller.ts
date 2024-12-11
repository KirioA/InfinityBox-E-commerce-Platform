import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

// Интерфейс новости для типизации
interface News {
    _id?: ObjectId;
    title: string;
    date: string; // Формат: "дд месяц гггг"
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Получение всех новостей
export const getNews = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();
        const newsCollection = db.collection('news');

        // Получаем все новости из базы данных
        const news = await newsCollection.find({}).toArray();

        // Возвращаем все поля новости
        return res.status(200).json({
            success: true,
            data: news.map(item => ({
                id: item._id,
                title: item.title,
                date: item.date,
                content: item.content,
                author: item.author, // Добавлено поле автора
                status: item.status || 'active', // Статус новости (по умолчанию active)
                isVisible: item.isVisible !== undefined ? item.isVisible : true, // Флаг видимости
                createdAt: item.createdAt, // Дата создания
                updatedAt: item.updatedAt, // Дата последнего обновления
            })),
        });
    } catch (error) {
        console.error('[ERROR][getNews]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Добавление новой новости
export const addNews = async (req: Request, res: Response) => {
    try {
        console.log(req.body); // Логирование для отладки
        const { title, date, content, author, status, isVisible } = req.body;

        // Валидация обязательных полей
        if (!title || !date || !content || !author) {
            return res.status(400).json({
                success: false,
                message: 'Все обязательные поля (title, date, content, author) должны быть заполнены!',
            });
        }

        const db = await dbGetConnection();
        const newsCollection = db.collection('news');

        // Создание новости с обязательными полями и значениями по умолчанию
        const newNews: News = {
            title,
            date,
            content,
            author,
            status: status || 'active', // Статус по умолчанию
            isVisible: isVisible !== undefined ? isVisible : true, // Видимость по умолчанию
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Добавляем новость в БД
        const result = await newsCollection.insertOne(newNews);

        return res.status(201).json({
            success: true,
            message: 'Новость успешно добавлена!',
            data: { id: result.insertedId, ...newNews },
        });
    } catch (error) {
        console.error('[ERROR][addNews]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};
// Обновление новости по ID
export const updateNewsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, date, content, author, status, isVisible } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID новости!' });
        }

        const db = await dbGetConnection();
        const newsCollection = db.collection('news');

        // Обновляем только переданные поля
        const updatedData: Partial<News> = {
            ...(title && { title }),
            ...(date && { date }),
            ...(content && { content }),
            ...(author && { author }),
            ...(status && { status }),
            ...(isVisible !== undefined && { isVisible }),
            updatedAt: new Date(),
        };

        const result = await newsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: 'Новость не найдена!' });
        }

        return res.status(200).json({
            success: true,
            message: 'Новость успешно обновлена!',
        });
    } catch (error) {
        console.error('[ERROR][updateNewsById]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Удаление новости по ID
export const deleteNews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID новости!' });
        }

        const db = await dbGetConnection();
        const newsCollection = db.collection('news');

        const result = await newsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Новость не найдена!' });
        }

        return res.status(200).json({
            success: true,
            message: 'Новость успешно удалена!',
        });
    } catch (error) {
        console.error('[ERROR][deleteNews]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Получение новости по ID
export const getNewsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Проверка корректности ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Некорректный ID новости!',
            });
        }

        const db = await dbGetConnection();
        const newsCollection = db.collection('news');

        // Поиск новости по ID
        const newsItem = await newsCollection.findOne({ _id: new ObjectId(id) });

        if (!newsItem) {
            return res.status(404).json({
                success: false,
                message: 'Новость не найдена!',
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: newsItem._id,
                title: newsItem.title,
                date: newsItem.date,
                content: newsItem.content,
                author: newsItem.author,
                status: newsItem.status || 'active',
                isVisible: newsItem.isVisible !== undefined ? newsItem.isVisible : true,
                createdAt: newsItem.createdAt,
                updatedAt: newsItem.updatedAt,
            },
        });
    } catch (error) {
        console.error('[ERROR][getNewsById]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};
