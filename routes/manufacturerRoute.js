import express from 'express';
import indexAction from '../controllers/manufacturerController';

const router = express.Router();

router.get('/', indexAction);

export default router;