import { ValidationErrors } from '@/data/enum/validationError.enum';

export default function checkPostalCode(value: string, pattern?: RegExp): string {
  if (pattern && !(typeof value === 'undefined')) {
    if (!value.match(pattern)) {
      return ValidationErrors.POSTAL_CODE;
    }
  }
  return '';
}
