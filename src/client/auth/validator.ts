import { AuthErrorMessages, InvalidAuthInputError } from "./errors";
import { AuthErrors, authErrorMessages } from "./errors/messages";

export type InputData = Record<string, string | undefined>;

export interface ValidationResult {
  email: string;
  password: string;
}

export class AuthValidator {
  validateSignUpInput(data: InputData): ValidationResult {
    const { email, password, repeatPassword } = data;
    const errorState: AuthErrorMessages = {};

    if (!email) {
      errorState.email = authErrorMessages.get(AuthErrors.MANDATORY_FIELD);
    }

    if (!password) {
      errorState.password = authErrorMessages.get(AuthErrors.MANDATORY_FIELD);
    }

    if (!repeatPassword) {
      errorState.repeatPassword = authErrorMessages.get(AuthErrors.MANDATORY_FIELD);
    }

    if (!email || !password || !repeatPassword) {
      throw new InvalidAuthInputError(errorState);
    }

    if (password !== repeatPassword) {
      errorState.password = authErrorMessages.get(AuthErrors.INVALID_CONFIRM_PASSWORD);
      throw new InvalidAuthInputError(errorState);
    }

    return { email, password };
  }

  validateSignInInput(data: InputData): ValidationResult {
    const { email, password } = data;
    const errorState: AuthErrorMessages = {};

    if (!email) {
      errorState.email = authErrorMessages.get(AuthErrors.MANDATORY_FIELD);
    }

    if (!password) {
      errorState.password = authErrorMessages.get(AuthErrors.MANDATORY_FIELD);
    }

    if (!email || !password) throw new InvalidAuthInputError(errorState);

    return { email, password };
  }
}

export const authValidator = new AuthValidator();