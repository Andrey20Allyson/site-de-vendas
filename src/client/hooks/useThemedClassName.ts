import { useAppSelector } from "../app/hooks";
import { Themes, themeSelector } from "../app/slices/theme";

export default function useThemedClassName(className: string) {
  const theme = useAppSelector(themeSelector);

  if (theme === Themes.DARK) className += ' dark'; 
  
  return className;
}