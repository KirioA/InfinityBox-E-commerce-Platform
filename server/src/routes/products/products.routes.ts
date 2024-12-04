import { Router } from 'express';
import { getProducts, addProduct, deleteProduct } from './products.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
