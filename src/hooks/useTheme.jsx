import { useLayoutEffect } from 'react';

export default function useTheme() {
  useLayoutEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    const Darktheme = currentTheme
      ? currentTheme === 'dark'
        ? true
        : false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(Darktheme);
    document.documentElement.classList.toggle('dark', Darktheme);
  }, []);
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
  }

  return {
    toggleTheme,
  };
}
