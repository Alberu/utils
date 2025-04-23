
export function letterToNumber(str) {
    if (!str) return ""

    return str.toLowerCase().split('').map(char => {
        if (/[a-z]/.test(char)) {
            return (char.charCodeAt(0) - 96).toString();
        } else {
            return char
        }
    }).join(' ')
}

export function numberToLetter(str) {
    if (!str) return ""

    return str.toLowerCase().split(' ').map(chars => {
        const num = parseInt(chars);
        return (num >= 1 && num <= 26) ? String.fromCharCode(num + 96) : chars;
    }).join('')
}