import { Request, Response } from 'express';
import { countWords } from '../utils/wordCounter';

export const wordCounterHandler = (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const wordCount = countWords(text);
    return res.status(200).json({ wordCount });
  } catch (error) {
    console.error('Error while counting words:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
