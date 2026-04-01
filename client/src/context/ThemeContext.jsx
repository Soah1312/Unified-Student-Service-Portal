import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme as setThemeInStore } from '../store/uiSlice';

const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const reduxTheme = useSelector((state) => state.ui?.theme || 'light');
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem('portal_theme');
    return saved || reduxTheme || 'light';
  });

  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', theme);

    // Re-enable transitions on the next animation frame to avoid flash.
    const rafId = window.requestAnimationFrame(() => {
      root.classList.remove('theme-switching');
    });

    localStorage.setItem('portal_theme', theme);
    dispatch(setThemeInStore(theme));

    return () => {
      window.cancelAnimationFrame(rafId);
      root.classList.remove('theme-switching');
    };
  }, [theme, dispatch]);

  const toggleTheme = React.useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    return nextTheme;
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
