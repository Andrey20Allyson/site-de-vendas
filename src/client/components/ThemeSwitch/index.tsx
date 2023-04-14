import React from "react";
import { Themes } from "../../contexts/theme";
import { useTheme } from "../../hooks/useTheme";
import { ToggleButton } from "../ToggleButton";
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import './index.css'
import { useLayoutEqualsTo } from "../../contexts/layout";
import { ScreenTypes } from "../../responsivity";

export interface ThemeSwitchProps {

}

export function ThemeSwitch({

}: ThemeSwitchProps) {
  const [theme, setTheme] = useTheme();
  const pocket = useLayoutEqualsTo(ScreenTypes.POCKET);

  const iconSize = pocket ? 20 : 30;

  return (
    <ToggleButton
      className="theme-switch"
      onToggle={value => setTheme(value ? Themes.DARK : Themes.LIGHT)}
      startToggled={theme === Themes.DARK}
      toggleoff={{
        node: <BsFillSunFill size={iconSize} />
      }}
      toggleon={{
        node: <BsFillMoonFill size={iconSize} />
      }} />
  )
}