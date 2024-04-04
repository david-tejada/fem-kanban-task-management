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

  // Synchronize dark mode when there are multiple tabs open.
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === "dark-mode" && e.newValue) {
        const parseValue = JSON.parse(e.newValue) as boolean;
        setDarkMode(parseValue);
      }
    });
  }, [setDarkMode]);

  return {
    darkMode: darkMode,
    toggleDarkMode: () => {
      setDarkMode(!darkMode);
    },
  };
}
