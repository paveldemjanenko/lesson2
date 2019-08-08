import express from 'express';
// import indexAction from '../controllers/productCardController';
import { indexAction, getProductById, addNewProduct } from '../controllers/productCardController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:productId', getProductById);
router.post('/', addNewProduct);

export default router;