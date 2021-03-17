import baseValidator from "validator";

const isEmpty = baseValidator.isEmpty;

/**
 * テキストが全角カナか判定
 * @param text string
 * @return bool
 */
const isFullWidthKana = (text: string) => {
  return baseValidator.matches(text, `^[ァ-ヶー\x20\u3000]*$`);
};

const validator = {
  isEmpty,
  isFullWidthKana,
};

export default validator;