import { render } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  test('renders', () => {
    render(<WeatherCard />);
  });
});
