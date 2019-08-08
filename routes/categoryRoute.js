import express from 'express';
import { indexAction, getCategoryById, addNewCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryId', getCategoryById);
router.post('/', addNewCategory);

export default router;
