import { useCallback, useEffect, useState } from 'react';
import { weatherAccessKey, weatherBaseUrl } from '../../constants';

export const useQuery = <T>(endpoint: string | null, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);

  const sendQuery = useCallback(async (endpoint: string) => {
    try {
      // Check if data is available in local storage
      const cachedData = localStorage.getItem(endpoint);
      if (cachedData) {
        // If data is already in the cache, return it
        setIsLoading(false);
        setError(null);
        setData(JSON.parse(cachedData) as T);
      } else {
        setIsLoading((prevState) => (prevState ? prevState : true));

        const response = await fetch(
          `${weatherBaseUrl}?access_key=${weatherAccessKey}${
            endpoint ? endpoint : ''
          }`,
          { mode: 'no-cors' }
        );
        if (!response.ok) {
          throw new Error('Could not fetch data');
        }
        const data = await response.json();

        if (data && data.success !== undefined && data.success === false) {
          console.log(data);
          throw new Error(data.error?.info ?? 'Could not fetch data');
        }

        if (data) {
          console.log(data);
          // Cache the data in localStorage
          localStorage.setItem(endpoint, JSON.stringify(data));
          setData(data as T);
        } else {
          throw new Error(data.error?.info ?? 'Could not fetch data');
        }
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    endpoint && sendQuery(endpoint);
  }, [endpoint, sendQuery]);

  return { data, isLoading, error, reload: sendQuery };
};
