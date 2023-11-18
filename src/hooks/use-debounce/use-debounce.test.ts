import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value(s)', () => {
    const { result } = renderHook(useDebounce);
    expect(result.current).toBe('');
  });

  it('should not set debounce value before timeout expiry', () => {
    const searchTerm = 'Googl';
    const { result } = renderHook(() => useDebounce(searchTerm));
    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(result.current).not.toBe(searchTerm);
  });

  it('should set debounce value after timeout expiry', () => {
    const searchTerm = 'Googl';
    const { result } = renderHook(() => useDebounce(searchTerm));
    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(searchTerm);
  });
});
