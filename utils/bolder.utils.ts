export const makeBolder = (text: string, word: string) => {
  return text.replace(word, `<b>${word}</b>`);
};
