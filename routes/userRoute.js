import express from 'express';
import { indexAction, getUserById, addNewUser } from '../controllers/userController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userId', getUserById);
router.post('/', addNewUser);

export default router;
