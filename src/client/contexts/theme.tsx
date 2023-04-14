import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext } from "react";
import useStorage, { UseStorageReturn } from "../hooks/useStorage";
import { THEME } from "../utils/storage-keys";

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Themes;
}

export enum Themes {
  DARK,
  LIGHT,
}

export const ThemeContext = createContext<UseStorageReturn<Themes> | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = Themes.LIGHT,
}: ThemeProviderProps) {
  const [theme, setTheme] = useStorage<Themes>(THEME, defaultTheme, localStorage);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}