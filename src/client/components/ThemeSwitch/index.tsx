import React from "react";
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Themes, changeTheme, themeSelector } from "../../app/slices/theme";
import { useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";
import { ToggleButton } from "../ToggleButton";
import './index.css';

export interface ThemeSwitchProps {

}

export function ThemeSwitch({

}: ThemeSwitchProps) {
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);
  const theme = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const iconSize = pocket ? 20 : 30;

  return (
    <ToggleButton
      className="theme-switch"
      onToggle={value => dispatch(changeTheme(value ? Themes.DARK : Themes.LIGHT))}
      startToggled={theme === Themes.DARK}
      toggleoff={{
        node: <BsFillSunFill size={iconSize} />
      }}
      toggleon={{
        node: <BsFillMoonFill size={iconSize} />
      }} />
  )
}