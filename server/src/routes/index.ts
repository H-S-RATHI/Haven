import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// API routes
router.use('/api/auth', authRoutes);

// Health check endpoint
router.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
