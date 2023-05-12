import { themeSelector } from "../app/slices/theme";
import { useAppSelector } from "../app/hooks";
import { useLayout } from "../contexts/layout";
import { ScreenTypes } from "../responsivity";
import { Themes } from "../app/features/theme";

export interface ClassNamesToStringOptions {
  useTheme?: boolean;
}

export class ClassNames {
  private classNames: Set<string>;
  
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

  useLayout() {
    const layout = useLayout();

    if (layout === ScreenTypes.POCKET) {
      this.add('pocket');
    }

    return this;
  }

  useTheme() {
    const theme = useAppSelector(themeSelector);

    if (theme === Themes.DARK) {
      this.add('dark');
    } else {
      this.delete('dark');
    };

    return this;
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