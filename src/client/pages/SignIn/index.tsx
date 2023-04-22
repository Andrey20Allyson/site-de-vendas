import React, { HTMLInputTypeAttribute, HTMLProps } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Layout from '../../layout/UserAuth';
import { Forms } from '../../components/Forms';

export default function SignIn() {
  return (
    <Layout>
      <div>
        <h2>Entrar</h2>
        <Forms itens={[{
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
          }]} />
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/sign-up'>Cadastrar-se</Link>
      </div>
    </Layout>
  );
}