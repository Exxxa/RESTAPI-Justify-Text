export function justifyText(text: string): string {
    const lineWidth = 80; 
    const words = text.split(' ');
    let line = '';
    let result = '';

    for (let i = 0; i < words.length; i++) {
        if (line.length + words[i].length > lineWidth) {
            let spacesToAdd = lineWidth - line.length;
            let spacePositions = line.length - line.replace(/ /g, '').length;

            while (spacesToAdd > 0 && spacePositions > 0) {
                line = line.replace(/(\s)(\S+)$/, '  $2');
                spacesToAdd--;
                spacePositions--;
            }

            result += line + '\n';
            line = '';
        }

        if (line !== '') {
            line += ' ';
        }

        line += words[i];
    }

    result += line;
    return result;
}