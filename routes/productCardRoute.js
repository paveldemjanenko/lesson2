import express from 'express';
import indexAction from '../controllers/productCardController';

const router = express.Router();

router.get('/', indexAction);

export default router;