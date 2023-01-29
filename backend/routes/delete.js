import express from 'express';
const router = express.Router();
import AuthController from '../controllers/AuthController.js';

export default router.post('/delete', AuthController.deletion)