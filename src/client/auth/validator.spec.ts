import { test, expect, describe } from 'vitest';
import { authValidator } from './validator';

test('SignIn input validation shold validate data', () => {
  const input = {
    'password': '1234',
    'email': 'john@doe.com',
  };

  try {
    const { email, password } = authValidator.validateSignInInput(input);

    expect(email).toBeTypeOf('string');
    expect(password).toBeTypeOf('string');
  } catch (error) {
    expect.fail(`Failed with error: ${error}!`);
  }
});

test('SignUp input validation shold validate data', () => {
  const input = {
    'repeatPassword': '1234',
    'email': 'john@doe.com',
    'password': '1234',
  };

  try {
    const { email, password } = authValidator.validateSignUpInput(input);

    expect(email).toBeTypeOf('string');
    expect(password).toBeTypeOf('string');
  } catch (error) {
    expect.fail(`Failed with error: ${error}!`);
  }
});