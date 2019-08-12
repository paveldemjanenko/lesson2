import express from 'express';
import { indexAction, getUserById, deleteUser, createUser } from '../controllers/userController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:userId', getUserById);
// router.post('/', modifyUser);
router.post('/', createUser);
// router.put('/:userId', modifyUser);
router.delete('/:userId', deleteUser);

export default router;
