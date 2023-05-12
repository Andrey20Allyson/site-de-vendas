import React from "react";
import { ClassNames } from "../../utils/css-class-names";
import './index.css';

export interface NavigationBarProps extends React.PropsWithChildren {
  className?: string;
}

export function NavigationBar({
  children,
  className,
}: NavigationBarProps) {

  const navClassNames = new ClassNames()
    .add('nav-container')
    .add('secondary-bg-color')
    .useTheme()
    .useLayout();

  if (className) navClassNames.add(className);

  return (
    <nav className={navClassNames.toString()}>
      {children}
    </nav>
  )
}

export * from './Options';