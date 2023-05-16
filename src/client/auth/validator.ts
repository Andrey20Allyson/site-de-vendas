import { AuthErrorMessages, InvalidAuthInputError } from "./errors";
import { AuthErrors, authErrorMessages } from "./errors/messages";
import type { FormsGetter } from "../components/Forms/forms-data";

export interface ValidationResult {
  email: string;
  password: string;
}

export class AuthValidator {
  validateSignUpInput(data: FormsGetter): ValidationResult {
    const errorState: AuthErrorMessages = {};
    let email: string | undefined, password: string | undefined, repeatPassword: string | undefined;

    try {
      email = data.getText('email');
      password = data.getText('password');
      repeatPassword = data.getText('repeatPassword');
    } catch { }

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

  validateSignInInput(data: FormsGetter): ValidationResult {
    const email = data.getText('email');
    const password = data.getText('password');
    
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