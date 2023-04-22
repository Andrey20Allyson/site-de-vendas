import React, { ComponentType, ReactNode } from 'react';
import { LayoutProvider, useLayout } from '../../contexts/layout';
import { ScreenTypes } from '../../responsivity';

export interface LayoutProps {
  children?: ReactNode;
}

export interface OuterLayoutProps extends LayoutProps {
  pocket?: boolean;
}

export interface LayoutMap {
  Pocket?: ComponentType<LayoutProps>;
  Default?: ComponentType<LayoutProps>;
}

export interface LayoutSelectorProps extends LayoutProps, LayoutMap { }

export function selectLayout(screenType: ScreenTypes, map: LayoutMap) {
  const key: keyof LayoutMap = screenType === ScreenTypes.NORMAL ? 'Default' : 'Pocket';
  
  return map[key] ?? ((props: LayoutProps) => <>{props.children}</>);
}

export function FlexibleLayout(props: LayoutSelectorProps) {
  return (
    <LayoutProvider>
      <LayoutSelector {...props} />
    </LayoutProvider>
  );
}

export function LayoutSelector(props: LayoutSelectorProps) {
  const layout = useLayout();

  const Layout = selectLayout(layout, props);

  return <Layout {...props} />;
}