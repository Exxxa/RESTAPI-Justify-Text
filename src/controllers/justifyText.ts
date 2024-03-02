// Importing necessary modules and functions
import { Request, Response } from 'express';
import { justifyText } from '../utils/justifyText';
import { countWords } from '../utils/wordCounter';
import { getUserWordCount, updateUserWordCount } from '../db/users';

// Handler function for justifying text
export const justifyTextHandler = async (req: Request, res: Response) => {
    try {
        // Extracting text from the request body and token from the headers
        const { text } = req.body;
        const token = req.headers.authorization;

        // If text is not provided, return an error
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Justify the text and count the words
        const justifiedText = justifyText(text);
        const wordCount = countWords(text);

        // Get the current word count of the user
        const currentWordCount = await getUserWordCount(token);
       
        // Update the user's word count
        await updateUserWordCount(token, currentWordCount + wordCount);

        // Return the justified text and the word count
        return res.status(200).json({ justifiedText, wordCount });
    } catch (error) {
        // Log the error and return a server error response
        console.error('Error while justifying text:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
