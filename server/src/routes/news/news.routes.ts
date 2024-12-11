import { Router } from 'express';
import { getNews, addNews, updateNewsById, deleteNews, getNewsById } from './news.controller';

const router = Router();

// Получение всех новостей
router.get('/', getNews);
router.get('/:id', getNewsById); // Получение новости по ID
// Добавление новости
router.post('/', addNews);

// Обновление новости по ID
router.put('/:id', updateNewsById);

// Удаление новости по ID
router.delete('/:id', deleteNews);

export default router;
