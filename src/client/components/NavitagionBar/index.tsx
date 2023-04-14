import React from "react";
import { useLayout, useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";
import './index.css';
import { Themes } from "../../contexts/theme";
import { useTheme } from "../../hooks/useTheme";

export interface NavigationBarProps extends React.PropsWithChildren {
  className?: string;
}

export function NavigationBar({
  children,
  className,
}: NavigationBarProps) {
  const [theme] = useTheme();
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);

  const classNames = ['nav'];

  if (pocket) classNames.push('pocket');
  if (className) classNames.push(className);
  if (theme === Themes.DARK) classNames.push('dark');

  return (
    <div className={classNames.join(' ')}>
      {children}
    </div>
  )
}