import { Themes } from "../contexts/theme";
import useTheme from "../hooks/useTheme";

export interface ClassNamesToStringOptions {
  useTheme?: boolean;
}

export class ClassNames {
  classNames: Set<string>;
  
  constructor() {
    this.classNames = new Set();
  }
  
  toString(options?: ClassNamesToStringOptions) {
    const {
      useTheme = false,
    } = options ?? {};
    
    if (useTheme) this.useTheme();
    
    return Array.from(this.classNames).join(' ');
  }

  useTheme() {
    const [theme] = useTheme();

    if (theme === Themes.DARK) {
      this.add('dark');
    } else {
      this.delete('dark');
    };

    return theme;
  }

  add(className: string) {
    this.classNames.add(className);
    return this;
  }

  addClasses(...classes: string[]) {
    for (const className of classes) this.add(className);
    return this;
  }

  delete(className: string) {
    return this.classNames.delete(className);
  }
}