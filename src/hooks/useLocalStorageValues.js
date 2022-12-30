import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    const initial = saved || defaultValue;
    return initial;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};