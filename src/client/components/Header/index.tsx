import React from 'react';
import './index.css';
import useThemedClassName from '../../hooks/useThemedClassName';
import { SearchBar } from '../SearchBar';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NavigationBar } from '../NavitagionBar';
import useUserId from '../../hooks/useUserId';
import { auth } from '../../firebase';

export default function Header() {
  const userId = useUserId();

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
        {userId ? <HeaderUserLinks /> : <HeaderAuthLinks />}
      </NavigationBar>
    </header>
  )
}

export function HeaderUserLinks() {
  return (
    <>
      <p>{auth.currentUser?.displayName}</p>
      <p onClick={exitHandler} >Sair</p>
    </>
  )

  function exitHandler() {
    auth.signOut();
  }
}

export function HeaderAuthLinks() {
  return (
    <>
      <Link to='/sign-in'>Entrar</Link>
      <Link to='/sign-up'>Registrar</Link>
    </>
  )
}