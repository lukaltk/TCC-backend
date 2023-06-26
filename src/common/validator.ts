import FastestValidator, { ValidationSchema, ValidationError } from 'fastest-validator';

export const validate = (schema: ValidationSchema, object: object) => {
  const validator = new FastestValidator();
  const check = validator.compile(schema);

  const result = check(object);

  if (result === true) return null;

  return result;
}