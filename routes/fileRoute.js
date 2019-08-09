import express from 'express';
import { saveFile } from '../controllers/fileController';

const router = express.Router();

// router.get('/:path', indexAction);
router.post('/', saveFile);

export default router;
