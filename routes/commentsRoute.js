import express from 'express';
import indexAction from '../controllers/commentsController';

const router = express.Router();

router.get('/', indexAction);

export default router;