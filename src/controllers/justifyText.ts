import { Request, Response } from 'express';
import { justifyText } from '../utils/justifyText';
import { countWords } from '../utils/wordCounter';
import { getUserById, getUserWordCount, updateUserWordCountById } from '../db/users';

export const justifyTextHandler = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        
        // Find user
        const { id } = req.params;
        
        // Count words in the provided text
        const textWordCount = countWords(text);
        console.log(`Text Word Count: ${textWordCount}`); // Print textWordCount

        // Get the stored word count for the user
        const userc = await getUserWordCount(id);
        const wordCount = userc?.wordCount || 0;

        // Check if total word count exceeds the limit
        const totalWordCount = wordCount + textWordCount;
        console.log(`User Word Count: ${wordCount}`);
        console.log(`Total Word Count: ${totalWordCount}`); // Print totalWordCount
        
        const maxWordCount = 80000;
        if (totalWordCount > maxWordCount) {
            return res.status(400).json({ error: 'Word count limit exceeded for the day' });
        }

        //Update the word count for the user
        await updateUserWordCountById(id, totalWordCount);

        // If word count is within limit, justify the text
        const justifiedText = justifyText(text);

        return res.status(200).json({ justifiedText });
    } catch (error) {
        console.error('Error while justifying text:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};