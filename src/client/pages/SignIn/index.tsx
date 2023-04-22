import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export interface SignInProps { }

export default function SignIn({ }: SignInProps) {
  return (
    <div>
      ola
      <Link to={'/'}>home</Link>
    </div>
  );
}