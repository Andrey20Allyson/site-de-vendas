import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, setPersistence, browserSessionPersistence, Persistence } from 'firebase/auth';
import { auth } from '../firebase';

interface UserAuthConfig {
  auth: Auth;
  persistence: Persistence;
  googleAuthProvider: GoogleAuthProvider;
}

export class UserAuth {
  constructor(private config: UserAuthConfig) { }
  
  async signInWithGoogle() {
    await setPersistence(this.config.auth, this.config.persistence);

    const credentials = await signInWithPopup(this.config.auth, this.config.googleAuthProvider);

    return credentials;
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    await setPersistence(this.config.auth, this.config.persistence);

    const credentials = await signInWithEmailAndPassword(this.config.auth, email, password);

    return credentials;
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    await setPersistence(this.config.auth, this.config.persistence);

    const credentials = await createUserWithEmailAndPassword(this.config.auth, email, password);

    return credentials;
  }
}

export const googleAuthProvider = new GoogleAuthProvider();
export const userAuth = new UserAuth({
  persistence: browserSessionPersistence,
  googleAuthProvider,
  auth,
});