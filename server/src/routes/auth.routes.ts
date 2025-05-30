import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

// Send OTP
router.post('/send-otp', AuthController.sendOtp);

// Verify OTP
router.post('/verify-otp', AuthController.verifyOtp);

export default router;
