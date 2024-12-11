import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { dbGetConnection } from '../../database.js';

// Интерфейс для вакансий
interface Job {
    _id?: ObjectId;
    title: string;
    location: string;
    description: string;
    status: 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;
}

// Получение всех вакансий
export const getJobs = async (req: Request, res: Response) => {
    try {
        const db = await dbGetConnection();
        const jobsCollection = db.collection('jobs');

        const jobs = await jobsCollection.find({}).toArray();

        // Преобразование _id в id для каждого документа
        const formattedJobs = jobs.map((job) => ({
            id: job._id.toString(),
            title: job.title,
            location: job.location,
            description: job.description,
            status: job.status,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
        }));

        return res.status(200).json({
            success: true,
            data: formattedJobs,
        });
    } catch (error) {
        console.error('[ERROR][getJobs]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};


// Добавление новой вакансии
export const addJob = async (req: Request, res: Response) => {
    try {
        console.log('[INFO][addJob] Получен запрос:', req.body); // Лог входящих данных

        const { title, location, description, status } = req.body;

        if (!title || !location || !description) {
            console.log('[ERROR][addJob]: Не все обязательные поля заполнены.');
            return res.status(400).json({ success: false, message: 'Все обязательные поля должны быть заполнены!' });
        }

        const db = await dbGetConnection();
        const jobsCollection = db.collection('jobs');

        const newJob: Job = {
            title,
            location,
            description,
            status: status || 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await jobsCollection.insertOne(newJob);

        console.log('[INFO][addJob] Новая вакансия добавлена:', { id: result.insertedId, ...newJob });

        return res.status(201).json({
            success: true,
            message: 'Вакансия успешно добавлена!',
            data: { id: result.insertedId, ...newJob },
        });
    } catch (error) {
        console.error('[ERROR][addJob]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Обновление вакансии
export const updateJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, location, description, status } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID вакансии!' });
        }

        const db = await dbGetConnection();
        const jobsCollection = db.collection('jobs');

        const updatedData: Partial<Job> = {
            ...(title && { title }),
            ...(location && { location }),
            ...(description && { description }),
            ...(status && { status }),
            updatedAt: new Date(),
        };

        const result = await jobsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: 'Вакансия не найдена!' });
        }

        return res.status(200).json({ success: true, message: 'Вакансия успешно обновлена!' });
    } catch (error) {
        console.error('[ERROR][updateJobById]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Удаление вакансии
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID вакансии!' });
        }

        const db = await dbGetConnection();
        const jobsCollection = db.collection('jobs');

        const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Вакансия не найдена!' });
        }

        return res.status(200).json({ success: true, message: 'Вакансия успешно удалена!' });
    } catch (error) {
        console.error('[ERROR][deleteJob]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

// Прием откликов на вакансию
export const applyForJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { applicantName, email } = req.body;
        console.log('Полученные данные:', { applicantName, email });  // Логирование входящих данных

        if (!applicantName || !email) {
            return res.status(400).json({ success: false, message: 'Все поля заявки должны быть заполнены!' });
        }

        const db = await dbGetConnection();
        const applicationsCollection = db.collection('job_applications');

        const application = {
            jobId: new ObjectId(id),
            applicantName,
            email,
            appliedAt: new Date(),
        };

        await applicationsCollection.insertOne(application);

        return res.status(201).json({ success: true, message: 'Отклик на вакансию успешно отправлен!' });
    } catch (error) {
        console.error('[ERROR][applyForJob]:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера!' });
    }
};

