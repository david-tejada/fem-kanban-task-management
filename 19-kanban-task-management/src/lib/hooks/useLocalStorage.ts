import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getValue = () => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }

    return JSON.parse(jsonValue) as T;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
