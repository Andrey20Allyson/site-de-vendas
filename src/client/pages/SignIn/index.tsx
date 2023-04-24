import React, { HTMLInputTypeAttribute, HTMLProps } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Layout from '../../layout/UserAuth';
import { Forms, FormsData } from '../../components/Forms';
import { BsGoogle } from 'react-icons/bs';
import { userAuth } from '../../auth';

export enum Provider {
  GOOGLE,
}

export const providersCallbacks = {
  [Provider.GOOGLE]: () => userAuth.signInWithGoogle(),
};

export default function SignIn() {
  async function submitHander(data: FormsData) {
    const { email, password } = data;

    if (!email || !password) return;

  }

  async function authWithProviderHander(provider: Provider) {
    const result = await providersCallbacks[provider]();

    console.log(result)
  }

  return (
    <Layout>
      <div>
        <h2>Entrar</h2>
        <Forms
          itens={[{
            title: 'Email',
            name: 'email',
            type: 'email'
          }, {
            title: 'Senha',
            name: 'password',
            type: 'password',
          }, {
            type: 'submit',
            value: 'Confirmar'
          }]}
          onSubmit={submitHander} />
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