import { useCallback, useEffect, useState } from "react";

type LocalStorageReturnValue = string[] | null;

type UseLocalStorage = (
  key: string
) => [value: LocalStorageReturnValue, setItem: (value: string[]) => void];

export const useLocalStorage: UseLocalStorage = (key) => {
  const getValueFromStorage = (key: string): LocalStorageReturnValue => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const [value, setValue] = useState<LocalStorageReturnValue>(() =>
    getValueFromStorage(key)
  );

  const setItem = useCallback(
    (newValue: string[]) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key]
  );

  useEffect(() => {
    const storedValue = getValueFromStorage(key);
    if (storedValue !== value) {
      setValue(storedValue);
    }
  }, [key]);

  return [value, setItem];
};
