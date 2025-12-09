import express from 'express';
import {
  getPreferences,
  updatePreferences,
  resetPreferences
} from '../controllers/preferencesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getPreferences);
router.put('/', updatePreferences);
router.post('/reset', resetPreferences);

export default router;

