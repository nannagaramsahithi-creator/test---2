import express from 'express';
import {
  createLostItem,
  getLostItems,
  getLostItemById,
} from '../controllers/lostItemController.js';

const router = express.Router();

router.route('/')
  .post(createLostItem)
  .get(getLostItems);

router.route('/:id')
  .get(getLostItemById);

export default router;
