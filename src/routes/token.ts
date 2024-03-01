import express from 'express';
import tokenController from '../controllers/tokenController';

const router = express.Router();

router.post('/api/token', tokenController);

export default router;
