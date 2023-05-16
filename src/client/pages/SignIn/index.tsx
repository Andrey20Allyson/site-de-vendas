import React, { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { AuthErrorMessages, authErrorHandler, authValidator, userAuth } from '../../auth';
import { Forms } from '../../components/Forms';
import Layout from '../../layout/UserAuth';
import './index.css';
import { FormsField } from '../../components/Forms/FormsField';
import { FormsGetter } from '../../components/Forms/forms-data';

export enum Provider {
  GOOGLE,
}

export const providersCallbacks = {
  [Provider.GOOGLE]: () => userAuth.signInWithGoogle(),
};

export default function SignIn() {
  const [errorMessages, setErrorState] = useState<AuthErrorMessages>({});
  const navigate = useNavigate();

  async function submitHander(data: FormsGetter) {
    try {
      const { email, password } = authValidator.validateSignInInput(data);

      await userAuth.signInWithEmailAndPassword(email, password);

      navigate('/');
    } catch (err) {
      const newErrorMessages = authErrorHandler.handle(err);

      setErrorState(newErrorMessages);
    }
  }

  async function authWithProviderHander(provider: Provider) {
    await providersCallbacks[provider]();
    
    navigate('/');
  }
  
  if (errorMessages.unknown) alert(errorMessages.unknown);

  return (
    <Layout>
      <div>
        <h2>Entrar</h2>
        <Forms
          onSubmit={submitHander}>
            <FormsField title='Email' name='email' type='email' errorMessage={errorMessages.email} />
            <FormsField title='Senha' name='password' type='password' errorMessage={errorMessages.email} />
            <FormsField title='Confirmar' type='submit' />
          </Forms>
      </div>
      <div className='sign-in-providers'>
        <div onClick={() => authWithProviderHander(Provider.GOOGLE)}>
          <BsGoogle size={25} />
        </div>
      </div>
      <div className='navigation-bar'>
        <Link to='/'>Home</Link>
        <Link to='/sign-up'>Cadastrar-se</Link>
        <Link to='/'>Esqueci a senha</Link>
      </div>
    </Layout>
  );
}