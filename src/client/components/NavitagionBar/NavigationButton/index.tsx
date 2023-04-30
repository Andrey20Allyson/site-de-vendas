import React from 'react';
import './index.css';
import { AiOutlineBook } from 'react-icons/ai';
import { useLayoutEqualsTo } from '../../../contexts/layout';
import { ScreenTypes } from '../../../responsivity';
import { useNavigate } from 'react-router-dom';
import { Themes } from '../../../app/slices/theme';
import useThemedClassName from '../../../hooks/useThemedClassName';
import { ClassNames } from '../../../utils/css-class-names';

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