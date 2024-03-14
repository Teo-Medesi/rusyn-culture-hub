function transliterateToCyrillic(text: string): string {
    const transliterationMapUkrainian: { [key: string]: string } = {
        "a": "а", "b": "б", "v": "в", "h": "г", "g": "ґ", "d": "д", "e": "е", "ye": "є", "zh": "ж",
        "z": "з", "y": "и", "i": "и", "yi": "ї", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о",
        "p": "п", "r": "р", "s": "с", "t": "т", "u": "у", "f": "ф", "kh": "х", "ts": "ц", "ch": "ч",
        "sh": "ш", "shch": "щ", "yu": "ю", "ya": "я",
        "A": "А", "B": "Б", "V": "В", "H": "Г", "G": "Ґ", "D": "Д", "E": "Е", "Ye": "Є", "Zh": "Ж",
        "Z": "З", "Y": "И", "I": "И", "Yi": "Ї", "K": "К", "L": "Л", "M": "М", "N": "Н", "O": "О",
        "P": "П", "R": "Р", "S": "С", "T": "Т", "U": "У", "F": "Ф", "Kh": "Х", "Ts": "Ц", "Ch": "Ч",
        "Sh": "Ш", "Shch": "Щ", "Yu": "Ю", "Ya": "Я"
    };

    const transliterationMapCroatian: { [key: string]: string } = {
        "je": "є",
        "ž": "ж",
        "ji": "ї",
        "h": "х",
        "c": "ц",
        "č": "ч",
        "š": "ш", 
        "šč": "щ", 
        "yu": "ю", "ju": "ю",
        "ya": "я", "ja": "я"
    };

    let result = "";
    let i = 0;

    while (i < text.length) {
        let currentChar = text[i];

        // Check if current character is in the Ukrainian map
        if (transliterationMapUkrainian[currentChar]) {
            result += transliterationMapUkrainian[currentChar];
            i++;
        } else {
            // Check for 2-character combinations
            let nextTwoChars = text.substr(i, 2);
            if (transliterationMapUkrainian[nextTwoChars]) {
                result += transliterationMapUkrainian[nextTwoChars];
                i += 2;
            } else if (transliterationMapCroatian[nextTwoChars]) {
                result += transliterationMapCroatian[nextTwoChars];
                i += 2;
            } else {
                // If no match is found, append the current character as is
                result += currentChar;
                i++;
            }
        }
    }

    return result;
}

function isCyrillic(text: string): boolean {
    const cyrillicRegex = /^[\u0400-\u04FF]+$/;
    return cyrillicRegex.test(text);
}

export {
    transliterateToCyrillic,
    isCyrillic
}