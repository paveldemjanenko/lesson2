import express from 'express';
import { indexAction, getManufacturerById, modifyManufacturer, deleteManufacturer } from '../controllers/manufacturerController';

const router = express.Router();

router.get('/', indexAction);
router.get('/:manufacturerId', getManufacturerById);
router.post('/', modifyManufacturer);
router.put('/:manufacturerId', modifyManufacturer);
router.delete('/:manufacturerId', deleteManufacturer);

export default router;