import express from 'express';
import { indexAction, getCommentById, addNewComment } from '../controllers/commentsController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentId', getCommentById);
router.post('/', addNewComment);

export default router;