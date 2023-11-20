import { useEffect, useState } from 'react';

export const useGeoLocation = (options?: PositionOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [data, setData] = useState<Partial<GeolocationPosition>>({});

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      setIsLoading(false);
      setError(null);
      setData(position);
    };

    const handleError = (positionError: GeolocationPositionError) => {
      setIsLoading(false);
      setError(positionError);
    };

    let id: number;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      );

      id = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        options
      );
    }

    return () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, []);

  return { isLoading, error, data };
};
