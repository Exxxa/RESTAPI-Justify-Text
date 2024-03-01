export function justifyText(text: string, lineLength: number): string {
    const words = text.split(' ');
    const lines: string[] = []; 
    let currentLine = '';
  
    for (const word of words) {
      if ((currentLine + word).length <= lineLength) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine.trim());
        currentLine = word;
      }
    }
  
    lines.push(currentLine.trim());
  
    return lines.join('\n');
  }