import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, getProductById, updateProductById } from './products.controller';

const router = Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);

export default router;
