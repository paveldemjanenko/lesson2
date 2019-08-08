import express from 'express';
import { indexAction, getProductById, addNewProduct } from '../controllers/productsController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:productId', getProductById);
router.post('/', addNewProduct);

export default router;
