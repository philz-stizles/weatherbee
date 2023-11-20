import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders label', () => {
    // Arrange.
    const mockedLabel = 'Save';
    render(<Button label={mockedLabel} />);

    // Assert.
    const buttonElement = screen.getByRole('button', { name: mockedLabel });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders disabled button', () => {
    // Arrange.
    const mockedLabel = 'Save';
    render(<Button label={mockedLabel} disabled />);

    // Assert.
    const buttonElement = screen.getByRole('button', { name: mockedLabel });
    expect(buttonElement).toBeDisabled();
  });

  test('renders a button of type "button" by default', () => {
    // Arrange.
    render(<Button />);

    // Assert.
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  test('renders a button of type "submit"', () => {
    // Arrange.
    render(<Button type="submit" />);

    // Act.
    const buttonElement = screen.getByRole('button');

    // Assert.
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('renders a disabled button when loading', () => {
    // Arrange.
    render(<Button isLoading />);

    // Act.
    const buttonElement = screen.getByRole('button');

    // Assert.
    expect(buttonElement).toBeDisabled();
  });

  test('renders a primary colored button by default', () => {
    // Arrange.
    render(<Button />);

    // Act.
    const buttonElement = screen.getByRole('button');

    // Assert.
    expect(buttonElement).toHaveClass('primary');
  });

  test('renders an outlined button', () => {
    // Arrange.
    render(<Button variant='outlined' />);

    // Act.
    const buttonElement = screen.getByRole('button');

    // Assert.
    expect(buttonElement).toHaveClass('outlined');
  });

  test('renders a white button', () => {
    // Arrange.
    render(<Button variant="white" />);

    // Act.
    const buttonElement = screen.getByRole('button');

    // Assert.
    expect(buttonElement).toHaveClass('white');
  });
});
