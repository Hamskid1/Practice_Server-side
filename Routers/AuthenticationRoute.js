import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js'; // Adjust the path as per your project structure

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for user logout
router.post('/logout', logoutUser);

export default router;
