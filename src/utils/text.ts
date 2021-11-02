export const capitaliseFirstLetter = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const getFirstWord = (text: string | undefined): string | null => {
  if (!text) return null;

  text = text.trim();
  const words = text.split(' ');

  return words.length ? words[0] : null;
};

export const multipleSpacesToSingle = (text: string): string => text.replace(/\s{2,}/g, ' ');

export const removeNonAlphaNumericCharacters = (text: string): string => text.replace(/\W/g, '');

export const removeNonNumericCharacters = (text: string): string => text.replace(/[^0-9.]/g, '');

export const truncateText = (text: string, maxLength: number): string =>
  `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`;
