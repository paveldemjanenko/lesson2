import express from 'express';
import { indexAction, getManufacturerById } from '../controllers/manufacturerController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufacturerId', getManufacturerById);

export default router;