export interface AuthErrorMessageState {
  repeatPassword?: string;
  password?: string;
  unknown?: string;
  email?: string;
  popUp?: string;
}

export type MessageGetter = () => string;

export enum AuthErrors {
  INVALID_CONFIRM_PASSWORD,
  MANDATORY_FIELD,
  WRONG_PASSWORD,
  WEAK_PASSWORD,
  INVALID_EMAIL,
  INVALID_AUTH,
}

export class AuthErrorMessageMap implements Record<AuthErrors, MessageGetter> {
  lang: string;

  constructor() {
    this.lang = 'unknown';
  }

  [AuthErrors.WRONG_PASSWORD]() {
    return 'Senha incorreta!';
  }

  [AuthErrors.INVALID_AUTH]() {
    return 'Email ou senha inválidos!';
  }

  [AuthErrors.INVALID_CONFIRM_PASSWORD]() {
    return 'As senhas não coincidem. Tente novamente!';
  }

  [AuthErrors.INVALID_EMAIL]() {
    return 'Email inválido!';
  }

  [AuthErrors.MANDATORY_FIELD]() {
    return 'Campo obrigatório!';
  }

  [AuthErrors.WEAK_PASSWORD]() {
    return 'Senha não pode possuir menos que 6 caracteres!';
  }
}

export class AuthErrorMessages {
  private map: AuthErrorMessageMap;

  constructor() {
    this.map = new AuthErrorMessageMap();
  }

  get(error: AuthErrors): string {
    return this.map[error]();
  }
}

export const authErrorMessages = new AuthErrorMessages();