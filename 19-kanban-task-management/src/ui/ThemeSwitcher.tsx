import { Switch } from "@headlessui/react";
import useDarkMode from "../lib/hooks/useDarkMode";

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center gap-6 rounded-md bg-blue-100 p-[0.875rem] dark:bg-neutral-800">
      <img src="/icon-light-theme.svg" alt="" />
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        className="relative inline-flex h-5 w-10 items-center rounded-full bg-purple-500 hover:bg-purple-500/75"
      >
        <span className="sr-only">
          {darkMode ? `Toggle light mode` : `Toggle dark mode`}
        </span>
        <span
          className={`${
            darkMode ? "translate-x-[1.4375rem]" : "translate-x-[0.1875rem]"
          } inline-block h-[0.875rem] w-[0.875rem] transform rounded-full bg-white transition`}
        />
      </Switch>
      <img src="/icon-dark-theme.svg" alt="" />
    </div>
  );
}
