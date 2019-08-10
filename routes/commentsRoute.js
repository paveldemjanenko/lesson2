import express from 'express';
import { indexAction, getCommentById, modifyComment, deleteComment } from '../controllers/commentsController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:commentId', getCommentById);
router.post('/', modifyComment);
router.put('/:commentId', modifyComment);
router.delete('/:commentId', deleteComment);

export default router;