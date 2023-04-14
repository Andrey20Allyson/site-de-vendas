import React from 'react';
import './index.css';
import { AiOutlineBook } from 'react-icons/ai';
import { useLayoutEqualsTo } from '../../../contexts/layout';
import { ScreenTypes } from '../../../responsivity';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { Themes } from '../../../contexts/theme';
import useThemedClassName from '../../../hooks/useThemedClassName';

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
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);
  const [theme] = useTheme();

  const bodyClasses = [
    'navbtn-body',
  ];

  function clickHandler(ev: React.MouseEvent<HTMLDivElement>) {
    onPress?.();

    if (href && !selected) {
      onNavigate?.(href)
    };
  }

  if (pocket) bodyClasses.push('pocket');
  if (selected) bodyClasses.push('selected');
  if (theme === Themes.DARK) bodyClasses.push('dark');

  return (
    <div
      className={bodyClasses.join(' ')}
      onClick={clickHandler}>
      <p
        className={useThemedClassName('navbtn-title')}>
        {title}
      </p>
    </div>
  )
}