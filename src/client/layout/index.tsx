import React from 'react';
import Header from '../components/Header';
import { ClassNames } from '../utils/css-class-names';
import './index.css';
import { FlexibleLayout, LayoutProps, OuterLayoutProps } from './lib/base';

export default function Layout(props: LayoutProps) {
  return <FlexibleLayout Default={Default} Pocket={Pocket} {...props} />
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

export function Default({
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

export function Pocket({
  children,
}: LayoutProps) {
  return (
    <OuterLayout pocket>
      {children}
    </OuterLayout>
  );
}