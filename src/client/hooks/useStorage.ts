import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export type UseStorageReturn<S> = [S, Dispatch<SetStateAction<S>>];

export default function useStorage<S>(key: string, initialValue: S, storage: Storage): UseStorageReturn<S> {
  const [value, setValue] = useState<S>(() => {
    const storedValue = storage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  return [value, setValue];
}