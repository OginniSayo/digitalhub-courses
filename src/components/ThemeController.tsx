import { type JSX } from 'react'
import { assets } from '../assets/assets'
import { useTheme } from '../context/ThemeContext'

const ThemeController = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'abyss';

  return (
    <label className="flex items-center gap-2 sm:gap-0.5 lg:gap-2 cursor-pointer">
      <assets.SunIcon size={18} className="text-primary shrink-0" />
      <input
        type="checkbox"
        className="toggle toggle-secondary text-primary"
        checked={isDark}
        onChange={toggleTheme}
      />
      <assets.MoonIcon size={18} className="text-primary shrink-0" />
    </label>
  );
};

export default ThemeController
