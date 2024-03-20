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

function cyrillicToLatin(text: string): string {
    const cyrillicToLatinMap: { [key: string]: string } = {
        "а": "a", "б": "b", "в": "v", "г": "kh", "д": "d", "е": "e", "ё": "yo", "ж": "zh", "з": "z",
        "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
        "с": "s", "т": "t", "у": "u", "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
        "ъ": "ie", "ы": "y", "ь": "'", "э": "e", "ю": "yu", "я": "ya", "є": "ye", "ї": "yi",
        "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D", "Е": "E", "Ё": "Yo", "Ж": "Zh", "З": "Z",
        "И": "I", "Й": "Y", "К": "K", "Л": "L", "М": "M", "Н": "N", "О": "O", "П": "P", "Р": "R",
        "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "Kh", "Ц": "Ts", "Ч": "Ch", "Ш": "Sh", "Щ": "Shch",
        "Ъ": "Ie", "Ы": "Y", "Ь": "'", "Э": "E", "Ю": "Yu", "Я": "Ya"
    };

    let result = "";
    for (let char of text) {
        result += cyrillicToLatinMap[char] || char;
    }
    return result;
}

function latinToCyrillic(text: string): string {
    const latinToCyrillicMap: { [key: string]: string } = {
        "a": "а", "b": "б", "v": "в", "g": "г", "d": "д", "e": "е", "yo": "ё", "zh": "ж", "z": "з",
        "i": "и", "y": "й", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "r": "р",
        "s": "с", "t": "т", "u": "у", "f": "ф", "kh": "х", "ts": "ц", "ch": "ч", "sh": "ш", "shch": "щ",
        "ie": "ъ", "iu": "ю", "ya": "я",
        "A": "А", "B": "Б", "V": "В", "G": "Г", "D": "Д", "E": "Е", "Yo": "Ё", "Zh": "Ж", "Z": "З",
        "I": "И", "Y": "Й", "K": "К", "L": "Л", "M": "М", "N": "Н", "O": "О", "P": "П", "R": "Р",
        "S": "С", "T": "Т", "U": "У", "F": "Ф", "Kh": "Х", "Ts": "Ц", "Ch": "Ч", "Sh": "Ш", "Shch": "Щ",
        "Ie": "Ъ", "Iu": "Ю", "Ya": "Я"
    };

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let nextTwoChars = text.substr(i, 2);
        let cyrillicChar = latinToCyrillicMap[nextTwoChars];
        if (cyrillicChar) {
            result += cyrillicChar;
            i++; // Skip next character as it's part of a 2-character combination
        } else {
            result += latinToCyrillicMap[char] || char;
        }
    }
    return result;
}

export {
    transliterateToCyrillic,
    isCyrillic,
    cyrillicToLatin,
    latinToCyrillic
}