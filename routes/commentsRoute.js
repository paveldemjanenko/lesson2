import express from 'express';
import { indexAction, getCommentById } from '../controllers/commentsController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentId', getCommentById);

export default router;