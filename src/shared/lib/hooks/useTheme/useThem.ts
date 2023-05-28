import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage/localStorage';
import { Theme } from '../../../const/theme/themeConst';
import { ThemeContext } from '../../context/ThemeContext';

interface UseThemResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): UseThemResult {
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        let newTheme;
        switch (theme) {
        case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
        case Theme.DARK:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.LIGHT;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
