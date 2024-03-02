// Importing necessary modules and functions
import { Request, Response } from 'express';
import { countWords } from '../utils/wordCounter';

// Handler function for counting words in a text
export const wordCounterHandler = (req: Request, res: Response) => {
  try {
    // Extracting text from the request body
    const { text } = req.body;

    // If text is not provided, return an error
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Count the words in the text
    const wordCount = countWords(text);

    // Return the word count
    return res.status(200).json({ wordCount });
  } catch (error) {
    // Log the error and return a server error response
    console.error('Error while counting words:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
