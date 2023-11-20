import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Page', () => {
  test('renders the favorites component', () => {
    // Arrange.
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Assert.
    const homeElement = screen.getByTestId('home');
    const favoritesElement = screen.getByTestId('favorites');

    expect(homeElement).toContainElement(favoritesElement);
  });

  test('renders the weather component', () => {
    // Arrange.
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Assert.
    const homeElement = screen.getByTestId('home');
    const weatherElement = screen.getByTestId('weather');

    expect(homeElement).toContainElement(weatherElement);
  });
});
