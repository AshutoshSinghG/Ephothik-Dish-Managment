import express from 'express';
import {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
  togglePublishStatus,
} from '../controllers/dishController.js';

const router = express.Router();

/**
 * Dish Routes
 * All routes are prefixed with /api/dishes
 */

// GET /api/dishes - Get all dishes
router.get('/', getDishes);

// POST /api/dishes - Create a new dish
router.post('/', createDish);

// PUT /api/dishes/:dishId - Update a dish
router.put('/:dishId', updateDish);

// DELETE /api/dishes/:dishId - Delete a dish
router.delete('/:dishId', deleteDish);

// PUT /api/dishes/:dishId/toggle - Toggle publish status
router.put('/:dishId/toggle', togglePublishStatus);

export default router;

