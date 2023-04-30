import React from "react";
import { useLayout, useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";
import './index.css';
import { ClassNames } from "../../utils/css-class-names";

export interface NavigationBarProps extends React.PropsWithChildren {
  className?: string;
}

export function NavigationBar({
  children,
  className,
}: NavigationBarProps) {
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);

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