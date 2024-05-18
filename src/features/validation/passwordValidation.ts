import { ValidationErrors } from '@/data/enum/validationError.enum';
import {
  checkUppercaseLetter,
  checkLowercaseLetter,
  checkDigit,
  checkSpecialChar,
  checkWhiteSpace
} from './validationRules';
import { PASSWORD_LENGTH } from '@/features/validation/validation.constants';

export default function checkPassword(value: string): string {
  if (value.length < PASSWORD_LENGTH) {
    return ValidationErrors.LENGTH_PASSWORD;
  }
  if (checkUppercaseLetter(value) || checkLowercaseLetter(value) || checkDigit(value) || checkSpecialChar(value)) {
    return ValidationErrors.PASSWORD;
  }
  if (checkWhiteSpace(value)) {
    return ValidationErrors.WHITESPACE;
  }
  return '';
}
