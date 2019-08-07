import express from 'express';
import indexAction from '../controllers/HomeController';

const router = express.Router();

router.get('/', indexAction);

export default router;
