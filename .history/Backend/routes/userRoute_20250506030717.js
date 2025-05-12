import express from 'express';
import {
  signup,
  login,
  verifyUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/verify/:user_id', verifyUser);

router.get('/users', protect, getAllUsers);
router.get('/users/:id', protect, getUserById);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, deleteUser);

export default router;
