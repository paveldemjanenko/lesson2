import express from 'express';
// import indexAction from '../controllers/productCardController';
import { indexAction, getProductById } from '../controllers/productCardController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:productId', getProductById);

export default router;