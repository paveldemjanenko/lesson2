import express from 'express';
import { indexAction, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryId', getCategoryById);

export default router;
