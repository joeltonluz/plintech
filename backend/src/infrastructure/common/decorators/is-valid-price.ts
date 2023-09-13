import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'is-valid-price', async: false })
export class IsValidPrice implements ValidatorConstraintInterface {
  validate(price: string) {
    const regexp = /^\d+\.\d{0,2}$/;
    return regexp.test(price);
  }

  defaultMessage(arg: ValidationArguments) {
    if (!arg.value) {
      return '$property is required';
    }
    return '($value) must be price valid';
  }
}
