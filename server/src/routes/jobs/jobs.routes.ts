import { Router } from 'express';
import { getJobs, addJob, updateJobById, deleteJob, applyForJob } from './jobs.controller';

const router = Router();

// Получить все вакансии
router.get('/', getJobs);

// Добавить новую вакансию
router.post('/', addJob);

// Обновить вакансию по ID
router.put('/:id', updateJobById);

// Удалить вакансию по ID
router.delete('/:id', deleteJob);

// Откликнуться на вакансию
router.post('/:id/apply', applyForJob);

export default router;
