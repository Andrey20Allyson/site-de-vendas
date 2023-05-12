import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthErrorMessages, authErrorHandler, authValidator, userAuth } from '../../auth';
import { Forms, FormsData } from '../../components/Forms';
import Layout from '../../layout/UserAuth';
import './index.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<AuthErrorMessages>({});

  async function submitHander(data: FormsData) {
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
        <Forms
          itens={[{
            title: 'Email',
            name: 'email',
            type: 'text',
            errorMessage: errorMessages.email,
          }, {
            title: 'Senha',
            name: 'password',
            type: 'password',
            errorMessage: errorMessages.password,
          }, {
            title: 'Repita a Senha',
            name: 'repeatPassword',
            type: 'password',
            errorMessage: errorMessages.repeatPassword,
          }, {
            value: 'Criar Conta',
            type: 'submit',
          }]}
          onSubmit={submitHander} />
      </div>
      <div className='navigation-bar'>
        <Link to='/'>Home</Link>
        <Link to='/sign-in'>Entrar</Link>
      </div>
    </Layout>
  );
}