import React, { PropsWithChildren, ReactNode } from 'react';
import Header from '../components/Header';
import { NavigationBar } from '../components/NavitagionBar';
import { LayoutProvider, useLayout } from '../contexts/layout';
import useThemedClassName from '../hooks/useThemedClassName';
import { ScreenTypes } from '../responsivity';
import './index.css';
import { ClassNames } from '../utils/css-class-names';

export interface LayoutProps {
  children?: ReactNode;
}

export interface OuterLayoutProps extends LayoutProps {
  pocket?: boolean;
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
  );
}

export function LayoutSelector(props: LayoutProps) {
  const layout = useLayout();

  const Layout = selectLayout(layout);

  return <Layout {...props} />;
}

export function OuterLayout({
  pocket,
  children,
}: OuterLayoutProps) {
  const layoutClasses = new ClassNames()
  .add('outer-layout')
  .add('bg-color-1')
  .useTheme();

  if (pocket) layoutClasses.add('pocket');

  return (
    <div className={layoutClasses.toString()}>
      {children}
    </div>
  );
}

export function NormalAppLayout({
  children,
}: LayoutProps) {
  return (
    <OuterLayout>
      <Header />
      <main>
        {children}
      </main>
    </OuterLayout>
  );
}

export function PocketAppLayout({
  children,
}: LayoutProps) {
  return (
    <OuterLayout pocket>
      {children}
    </OuterLayout>
  );
}