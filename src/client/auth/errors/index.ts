import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { AuthErrorMessageState, AuthErrors, authErrorMessages } from "./messages";

export type AuthErrorReducer = (error: FirebaseError) => AuthErrorMessageState;
export type AuthErrorReducerMapType = Map<string, AuthErrorReducer>;

export interface AuthErrorReducerMapConfig {
  reducers: Iterable<[string, AuthErrorReducer]>;
}

export class InvalidAuthInputError extends Error {
  messages: AuthErrorMessageState;

  constructor(messages: AuthErrorMessageState) {
    super('Invalid input!');

    this.messages = messages;
  }
}

export class AuthErrorReducerMap {
  reducerMap: AuthErrorReducerMapType;
  defaultReducer: AuthErrorReducer = error => ({ unknown: error.message });

  constructor(config: AuthErrorReducerMapConfig) {
    this.reducerMap = new Map(config.reducers);
  };

  get(key: string): AuthErrorReducer {
    return this.reducerMap.get(key) ?? this.defaultReducer;
  }

  reduce(error: FirebaseError) {
    const handler = this.get(error.code)

    return handler(error);
  }
}

export class AuthErrorHandler {
  handle(error: unknown): AuthErrorMessageState {
    if (error instanceof InvalidAuthInputError) {
      return error.messages;
    }

    if (error instanceof FirebaseError) {
      return authErrorReducerMap.reduce(error);
    }

    return { email: String(error) };
  }
}

export const authErrorReducerMap = new AuthErrorReducerMap({
  reducers: [
    [AuthErrorCodes.INVALID_EMAIL, () => ({ email: authErrorMessages.get(AuthErrors.INVALID_EMAIL) })],
    [AuthErrorCodes.WEAK_PASSWORD, () => ({ password: authErrorMessages.get(AuthErrors.WEAK_PASSWORD) })],
    [AuthErrorCodes.INVALID_PASSWORD, () => ({ password: authErrorMessages.get(AuthErrors.WRONG_PASSWORD) })],
    [AuthErrorCodes.INVALID_AUTH, () => {
      const msg = authErrorMessages.get(AuthErrors.INVALID_AUTH);
      return { email: msg, password: msg };
    }],
  ],
});

export const authErrorHandler = new AuthErrorHandler();

export { AuthErrorMessageState as AuthErrorMessages };
