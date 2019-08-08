import express from 'express';
import { indexAction, getManufacturerById, addNewManufacturer } from '../controllers/manufacturerController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufacturerId', getManufacturerById);
router.post('/', addNewManufacturer);

export default router;