import { Request, Response } from 'express';
import { justifyText } from '../utils/justifyText';

export const justifyTextHandler = (req: Request, res: Response) => {
    try {
      const { text, lineLength } = req.body;
      if (!text || !lineLength) {
        return res.status(400).json({ error: 'Text and lineLength are required' });
      }
      const justifiedText = justifyText(text, lineLength);
      return res.status(200).json({ justifiedText });
    } catch (error) {
      console.error('Error while justifying text:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  