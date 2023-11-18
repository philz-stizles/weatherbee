import { renderHook } from '@testing-library/react';

import { useGeoLocation } from './use-geolocation';

describe('useGeoLocation', () => {
  test('should return initial value(s)', () => {
    const { result } = renderHook(useGeoLocation);

    expect(result.current.isLoading).toBe(true);
  });
});
