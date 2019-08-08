import express from 'express';
import { indexAction, getOrderById, addNewOrder } from '../controllers/orderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderId', getOrderById);
router.post('/', addNewOrder);

export default router;
