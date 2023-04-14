import { Themes } from "../contexts/theme";
import { useTheme } from "./useTheme";

export default function useThemedClassName(className: string) {
  const [theme] = useTheme();

  if (theme === Themes.DARK) className += ' dark'; 
  
  return className;
}