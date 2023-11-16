import { useCallback, useEffect, useState } from 'react';
import { weatherAccessKey, weatherBaseUrl } from '../constants';

const useQuery = <T>(endpoint: string | null, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);

  const sendQuery = useCallback(async (endpoint?: string) => {
    try {
      setIsLoading((prevState) => (prevState ? prevState : true));

      const response = await fetch(
        `${weatherBaseUrl}?access_key=${weatherAccessKey}`
      );
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();

      if (data && !data.success) {
        throw new Error(data.error?.info ?? 'Could not fetch data');
      }

      console.log(data);
      if (data) {
        setData(data as T);
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

export default useQuery;
