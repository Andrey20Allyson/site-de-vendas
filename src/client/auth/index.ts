import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

export class UserAuth {
  constructor(private config: {
    auth: Auth;
    googleAuthProvider: GoogleAuthProvider;
  }) { }

  async signInWithGoogle() {
    const credentials = await signInWithPopup(this.config.auth, this.config.googleAuthProvider);
  
    return credentials;
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const credentials = await signInWithEmailAndPassword(this.config.auth, email, password);
    
    return credentials;
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    const credentials = await createUserWithEmailAndPassword(this.config.auth, email, password);

    return credentials;
  }
}

export const googleAuthProvider = new GoogleAuthProvider();
export const userAuth = new UserAuth({
  googleAuthProvider,
  auth,
});