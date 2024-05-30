import { ValidationErrors } from '@/features/validation/data/validation.enum';
import { checkAge } from './data/validationRules';

export default function checkBirthday(value: string): string {
  if (checkAge(value)) {
    return ValidationErrors.AGE;
  }
  return '';
}
