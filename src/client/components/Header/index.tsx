import React from 'react';
import './index.css';
import useThemedClassName from '../../hooks/useThemedClassName';
import { SearchBar } from '../SearchBar';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NavigationBar } from '../NavitagionBar';

export default function Header() {
  return (
    <header className={useThemedClassName('header-body')}>
      <section className={useThemedClassName('primary-bg-color')}>
        <h2>TecStore</h2>
        <SearchBar />
        <div className='cart'>
          <AiOutlineShoppingCart size={30} />
          <p>
            {'+99'}
          </p>
        </div>
      </section>
      <NavigationBar>
        <Link to='/'>Home</Link>
        <Link to='/sign-in'>Entrar</Link>
        <Link to='/sign-up'>Registrar</Link>
      </NavigationBar>
    </header>
  )
}