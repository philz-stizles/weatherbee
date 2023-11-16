import { useEffect, useState } from 'react';

export const useDebounce = (
  searchValue: string,
  milliSeconds: number = 1000
) => {
  const [debounceValue, setDebounceValue] = useState('');
  useEffect(() => {
    let timeout: NodeJS.Timer;

    timeout = setTimeout(() => {
      setDebounceValue(searchValue);
    }, milliSeconds);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [milliSeconds, searchValue]);

  return debounceValue;
};
