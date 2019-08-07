import express from 'express';
import indexAction from '../controllers/orderController';

const router = express.Router();

router.get('/', indexAction);

export default router;