"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateText = exports.removeNonNumericCharacters = exports.removeNonAlphaNumericCharacters = exports.multipleSpacesToSingle = exports.getFirstWord = exports.capitaliseFirstLetter = void 0;
const capitaliseFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);
exports.capitaliseFirstLetter = capitaliseFirstLetter;
const getFirstWord = (text) => {
    if (!text)
        return null;
    text = text.trim();
    const words = text.split(' ');
    return words.length ? words[0] : null;
};
exports.getFirstWord = getFirstWord;
const multipleSpacesToSingle = (text) => text.replace(/\s{2,}/g, ' ');
exports.multipleSpacesToSingle = multipleSpacesToSingle;
const removeNonAlphaNumericCharacters = (text) => text.replace(/\W/g, '');
exports.removeNonAlphaNumericCharacters = removeNonAlphaNumericCharacters;
const removeNonNumericCharacters = (text) => text.replace(/[^0-9.]/g, '');
exports.removeNonNumericCharacters = removeNonNumericCharacters;
const truncateText = (text, maxLength) => `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`;
exports.truncateText = truncateText;
//# sourceMappingURL=text.js.map