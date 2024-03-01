import express from 'express';

const MAX_WORDS_PER_DAY = 80000;
const wordCountMap = new Map();

const rateLimiterMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { user } = req;
  const text = req.body.text;
  const wordCount = text.split(' ').length;

  const currentWordCount = wordCountMap.get(user.email) || 0;
  if (currentWordCount + wordCount > MAX_WORDS_PER_DAY) {
    return res.status(402).json({ error: 'Word limit exceeded' });
  }

  wordCountMap.set(user.email, currentWordCount + wordCount);
  next();
};

export default rateLimiterMiddleware;
