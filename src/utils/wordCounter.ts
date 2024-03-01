export function countWords(text: string): number {
    const words = text.trim().split(/\s+/);
    return words.length;
}
