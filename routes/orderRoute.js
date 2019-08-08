import express from 'express';
import { indexAction, getOrderById } from '../controllers/orderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderId', getOrderById);

export default router;
