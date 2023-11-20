import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { BrowserRouter } from 'react-router-dom';

describe('Logo', () => {
  test('render Logo text', () => {
    // Arrange.
    const logoText = 'Weatherbee';
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    // Assert.
    const logoTextElement = screen.getByText(logoText, { exact: false });
    expect(logoTextElement).toBeInTheDocument();
  });
});
