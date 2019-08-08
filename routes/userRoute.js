import express from 'express';
import { indexAction, getUserById } from '../controllers/userController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userId', getUserById);

export default router;
