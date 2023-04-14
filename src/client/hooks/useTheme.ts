import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (theme === null) throw Error('useTheme must be inside a ThemeProvider');

  return theme;
}