import { renderHook, waitFor } from '@testing-library/react';
import { useQuery } from './use-query';

global.fetch = jest.fn();

describe('useQuery', () => {
  let mockedData: object[];

  beforeEach(() => {
    mockedData = [
      {
        body: 'mocked body',
        id: 1,
        title: 'mock title',
        userId: 1,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedData),
    });
  });

  it('should return initial value(s)', async () => {
    const { result } = renderHook(() => useQuery('', null));
    const { data, error, isLoading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(isLoading).toBe(true);
  });

  it('should return data', async () => {
    const { result } = renderHook(() => useQuery('', null));

    await waitFor(() =>
      expect(result.current).toEqual({
        data: mockedData,
        error: null,
        isLoading: false,
      })
    );
  });

  it('should initially return true for "isLoading" and then false on data return', async () => {
    const { result } = renderHook(() => useQuery('', null));
    const { isLoading } = result.current;

    expect(isLoading).toEqual(true);

    await waitFor(() => {
      const { isLoading } = result.current;

      expect(isLoading).toEqual(false);
    });
  });

  // it('should initially return null for "error" and then false on data return', async () => {
  //   const { result } = renderHook(() => useQuery('', null));
  //   const { isLoading } = result.current;

  //   expect(isLoading).toBe(true);

  //   await waitFor(() => {
  //     const { isLoading } = result.current;

  //     expect(isLoading).toBe(false);
  //   });
  // });
});
