import express from 'express';
import indexAction from '../controllers/categoryController';

const router = express.Router();

router.get('/', indexAction);

export default router;
