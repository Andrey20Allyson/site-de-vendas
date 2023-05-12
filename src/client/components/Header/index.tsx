import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import useThemedClassName from '../../hooks/useThemedClassName';
import { NavigationBar } from '../NavitagionBar';
import { SearchBar } from '../SearchBar';
import './index.css';

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
        <AuthSection />
      </NavigationBar>
    </header>
  )
}

export function AuthSection() {
  const authState = useAuth();

  if (authState.isInitialized) {
    return authState.id ? <HeaderUserLinks /> : <HeaderAuthLinks />
  } else {
    return <LinksSkeleton />
  }
}

export function HeaderUserLinks() {
  function exitHandler() {
    auth.signOut();
  }
  
  return (
    <>
      <p>{auth.currentUser?.displayName}</p>
      <p onClick={exitHandler} >Sair</p>
    </>
  )
}

export function HeaderAuthLinks() {
  return (
    <>
      <Link to='/sign-in'>Entrar</Link>
      <Link to='/sign-up'>Registrar</Link>
    </>
  )
}

export function LinksSkeleton() {
  const sharedProps = {
    baseColor: '#88f',
    highlightColor: '#fff6',
  } as SkeletonProps;

  return (
    <>
      <Skeleton width={150} {...sharedProps} />
      <Skeleton width={50} {...sharedProps} />
    </>
  )
}