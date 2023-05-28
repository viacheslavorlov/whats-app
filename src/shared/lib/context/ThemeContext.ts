import { createContext } from 'react';
import { Theme } from '../../const/theme/themeConst';

export interface ThemeContextProps {
    theme?: Theme;
    // eslint-disable-next-line no-unused-vars
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
