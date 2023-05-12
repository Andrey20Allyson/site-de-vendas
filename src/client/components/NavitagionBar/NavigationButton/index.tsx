import React from 'react';
import { useNavigate } from 'react-router-dom';
import useThemedClassName from '../../../hooks/useThemedClassName';
import { ClassNames } from '../../../utils/css-class-names';
import './index.css';

export interface NavigationButtonProps {
  title: string;
  selected?: boolean;
  href?: string;
  onPress?: () => void;
  onNavigate?: (href: string) => void;
}

export function NavigationButton({
  href,
  title,
  onPress,
  onNavigate = useNavigate(),
  selected = location.pathname === href,
}: NavigationButtonProps) {
  function clickHandler(ev: React.MouseEvent<HTMLDivElement>) {
    onPress?.();

    if (href && !selected) {
      onNavigate?.(href)
    };
  }

  const bodyClasses = new ClassNames()
    .add('navbtn-body')
    .useLayout()
    .useTheme();

  if (selected) bodyClasses.add('selected');

  return (
    <div
      className={bodyClasses.toString()}
      onClick={clickHandler}>
      <p
        className={useThemedClassName('navbtn-title')}>
        {title}
      </p>
    </div>
  )
}