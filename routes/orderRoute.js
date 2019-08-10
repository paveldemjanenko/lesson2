import express from 'express';
import { indexAction, getOrderById, modifyOrder, deleteOrder } from '../controllers/orderController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:orderId', getOrderById);
router.post('/', modifyOrder);
router.put('/:orderId', modifyOrder);
router.delete('/:orderId', deleteOrder);

export default router;
