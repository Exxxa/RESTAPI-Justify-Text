import express from 'express';
import { justifyText } from '../utils/justifyText';

const router = express.Router();

router.post('/api/justify', (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const justifiedText = justifyText(text, 80);
  res.send(justifiedText);
});

export default router;
