import React from 'react';
import './index.css';
import Layout from '../../layout/UserAuth';
import { Forms, FormsData } from '../../components/Forms';
import { Link } from 'react-router-dom';

export interface SignUpProps { }

export default function SignUp({ }: SignUpProps) {
  function submitHander(data: FormsData) {

  }

  return (
    <Layout>
      <div>
        <h2>Cadastrar-se</h2>
        <Forms
          itens={[{
            title: 'Email',
            name: 'email',
            type: 'text'
          }, {
            title: 'Senha',
            name: 'password',
            type: 'password',
          }, {
            title: 'Repita a Senha',
            name: 'repeatPassword',
            type: 'password',
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