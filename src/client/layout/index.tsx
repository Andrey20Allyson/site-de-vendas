import React, { FormEvent, ReactNode, useRef } from 'react';
import { NavigationBar } from '../components/NavitagionBar';
import { NavigationButton } from '../components/NavitagionBar/NavigationButton';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { LayoutProvider, useLayout } from '../contexts/layout';
import useThemedClassName from '../hooks/useThemedClassName';
import { ScreenTypes } from '../responsivity';
import './index.css';
import { SearchBar } from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export interface AppNavigationBarProps {

}

export function AppNavigationBar() {
  return (
    <NavigationBar>

    </NavigationBar>
  )
}

export interface LayoutProps {
  children?: ReactNode;
}

export type LayoutMap = {
  [key in ScreenTypes]: (props: LayoutProps) => JSX.Element;
}

export const layouts: LayoutMap = {
  [ScreenTypes.NORMAL]: NormalAppLayout,
  [ScreenTypes.POCKET]: PocketAppLayout,
};

export function selectLayout(screenType: ScreenTypes) {
  return layouts[screenType];
}

export function FlexibleLayout(props: LayoutProps) {
  return (
    <LayoutProvider>
      <LayoutSelector {...props} />
    </LayoutProvider>
  )
}

export function LayoutSelector(props: LayoutProps) {
  const layout = useLayout();

  const Layout = selectLayout(layout);

  return <Layout {...props} />
}

export function Header() {
  return (
    <header className={useThemedClassName('header-body')}>
      <section>
        <h2>TecStore</h2>
        <SearchBar />
        <div className='cart'>
          <AiOutlineShoppingCart size={30} />
          <p>
            {'+99'}
          </p>
        </div>
      </section>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </header>
  )
}

export function NormalAppLayout({
  children,
}: LayoutProps) {
  return (
    <div className={useThemedClassName("outer-layout")}>
      <Header />
      {children}
    </div>
  )
}

export function PocketAppLayout({
  children,
}: LayoutProps) {
  return (
    <div className={useThemedClassName("outer-layout pocket")}>
      {children}
    </div>
  )
}