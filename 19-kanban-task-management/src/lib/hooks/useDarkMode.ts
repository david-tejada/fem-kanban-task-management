import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useDarkMode() {
  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useLocalStorage(
    "dark-mode",
    mediaQueryList.matches,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [mediaQueryList, setDarkMode]);

  return {
    darkMode: darkMode,
    toggleDarkMode: () => {
      setDarkMode(!darkMode);
    },
  };
}
