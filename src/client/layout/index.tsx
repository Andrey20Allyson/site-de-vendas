import React, { ReactNode } from 'react';
import { NavigationBar } from '../components/NavitagionBar';
import { NavigationButton } from '../components/NavitagionBar/NavigationButton';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { LayoutProvider, useLayout } from '../contexts/layout';
import useThemedClassName from '../hooks/useThemedClassName';
import { ScreenTypes } from '../responsivity';
import './index.css';

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

export function NormalAppLayout({
  children,
}: LayoutProps) {
  return (
    <div className={useThemedClassName("outer-layout")}>
      
    </div>
  )
}

export function PocketAppLayout({
  children,
}: LayoutProps) {
  return (
    <div className={useThemedClassName("outer-layout pocket")}>
      
    </div>
  )
}