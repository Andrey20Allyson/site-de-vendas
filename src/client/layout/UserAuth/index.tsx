import React from 'react';
import './index.css';
import { FlexibleLayout, LayoutProps } from '../lib/base';
import { ClassNames } from '../../utils/css-class-names';
import useTheme from '../../hooks/useTheme';
import { Themes } from '../../contexts/theme';

export default function Layout(props: LayoutProps) {
  return <FlexibleLayout Default={Default} Pocket={Pocket} {...props} />
}

export function createDefaultLayoutClasses() {
  const outerLayoutClassNames = new ClassNames()
    .add('user-auth-outer-layout')
    .useTheme()
    .toString();

  const innerLayoutClassNames = new ClassNames()
    .add('user-auth-inner-layout')
    .useTheme()
    .toString();

  return { outerLayoutClassNames, innerLayoutClassNames };
}

export function Default({
  children
}: LayoutProps) {
  const { innerLayoutClassNames, outerLayoutClassNames } = createDefaultLayoutClasses();

  return (
    <div className={outerLayoutClassNames}>
      <div className={innerLayoutClassNames}>
        {children}
      </div>
    </div>
  );
}

export function Pocket({
  children
}: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}