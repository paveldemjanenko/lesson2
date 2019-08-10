import express from 'express';
import { indexAction, getCategoryById, modifyCategory, deleteCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:categoryId', getCategoryById);
router.post('/', modifyCategory);
router.put('/:categoryId', modifyCategory);
router.delete('/:categoryId', deleteCategory);

export default router;
