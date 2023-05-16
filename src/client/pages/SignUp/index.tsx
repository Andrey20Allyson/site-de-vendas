import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthErrorMessages, authErrorHandler, authValidator, userAuth } from '../../auth';
import { Forms } from '../../components/Forms';
import Layout from '../../layout/UserAuth';
import './index.css';
import { FormsField } from '../../components/Forms/FormsField';
import { FormsGetter } from '../../components/Forms/forms-data';

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<AuthErrorMessages>({});

  async function submitHander(data: FormsGetter) {
    try {
      const { email, password } = authValidator.validateSignUpInput(data);

      await userAuth.signUpWithEmailAndPassword(email, password);

      navigate('/');
    } catch (err) {
      let newErrorMessages = authErrorHandler.handle(err);

      setErrorMessages(newErrorMessages);
    }
  }

  return (
    <Layout>
      <div>
        <h2>Cadastrar-se</h2>
        <Forms onSubmit={submitHander}>
          <FormsField title='Email' name='email' type='email' errorMessage={errorMessages.email} />
          <FormsField title='Senha' name='password' type='password' errorMessage={errorMessages.password} />
          <FormsField title='Repita a senha' name='repeatPassword' type='password' errorMessage={errorMessages.repeatPassword} />
          <FormsField title='Repita a senha' type='submit' />
        </Forms>
      </div>
      <div className='navigation-bar'>
        <Link to='/'>Home</Link>
        <Link to='/sign-in'>Entrar</Link>
      </div>
    </Layout>
  );
}