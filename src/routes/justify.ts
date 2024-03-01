import express from 'express';
import authMiddleware from '../middleware/auth';
import rateLimiterMiddleware from '../middleware/rateLimiter';
import justifyController from '../controllers/justifyController';

const router = express.Router();

router.use(authMiddleware);
router.use(rateLimiterMiddleware);

router.post('/api/justify', justifyController);

export default router;
