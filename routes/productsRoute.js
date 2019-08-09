import express from 'express';
import { indexAction, getProductById, modifyProduct, deleteProduct } from '../controllers/productsController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:productId', getProductById);
router.post('/', modifyProduct);
router.put('/:productId', modifyProduct);
router.delete('/:productId', deleteProduct);

export default router;
