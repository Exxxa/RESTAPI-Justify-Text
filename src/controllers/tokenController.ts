import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/token', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

export default router;
