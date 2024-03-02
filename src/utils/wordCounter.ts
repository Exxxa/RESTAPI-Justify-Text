export function countWords(text: string): number {
    // Trim the text to remove leading and trailing whitespaces,
    // then split it into an array of words using one or more whitespace characters as the delimiter
    const words = text.trim().split(/\s+/);
    // Return the length of the words array, which represents the number of words in the text
    return words.length;
}