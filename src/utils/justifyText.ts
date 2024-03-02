export function justifyText(text: string): string {
    // Set the maximum line width
    const lineWidth = 80; 
    // Split the text into words
    const words = text.split(' ');
    // Initialize variables for tracking the current line and the final result
    let line = '';
    let result = '';

    // Loop through each word in the text
    for (let i = 0; i < words.length; i++) {
        // If adding the current word exceeds the line width
        if (line.length + words[i].length > lineWidth) {
            // Calculate the number of spaces needed to fill the line width
            let spacesToAdd = lineWidth - line.length;
            // Count the number of spaces in the current line
            let spacePositions = line.length - line.replace(/ /g, '').length;

            // Add extra spaces between words to justify the line
            while (spacesToAdd > 0 && spacePositions > 0) {
                // Replace the last space in a word with two spaces
                line = line.replace(/(\s)(\S+)$/, '  $2');
                spacesToAdd--;
                spacePositions--;
            }

            // Add the justified line to the result and start a new line
            result += line + '\n';
            line = '';
        }

        // If the line is not empty, add a space before adding the next word
        if (line !== '') {
            line += ' ';
        }

        // Add the current word to the line
        line += words[i];
    }

    // Add the last line to the result
    result += line;
    // Return the justified text
    return result;
}