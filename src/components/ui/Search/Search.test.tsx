import { render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe('Search', () => {
  test('render with initial empty value', () => {
    // Arrange.
    render(<Search />);

    // Assert.
    const searchElement = screen.getByRole('searchbox');
    expect(searchElement).toHaveValue('');
  });

  test('render with a placeholder text', () => {
    // Arrange.
    const placeholder = 'Search places...';
    render(<Search placeholder={placeholder} />);

    // Assert.
    const search = screen.getByRole('searchbox');
    expect(search).toHaveAttribute('placeholder', placeholder);
  });

  test('render with a label', () => {
    // Arrange.
    const label = 'Search places';
    render(<Search label={label} />);

    // Assert.
    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with the provided id as label "for" and input "id" attributes', () => {
    // Arrange.
    const mockedLabel = 'Search places';
    const mockedId = 'search';
    render(<Search id={mockedId} label={mockedLabel} />);

    // Assert.
    const labelElement = screen.getByLabelText(mockedLabel);
    const inputElement = screen.getByRole('searchbox');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', mockedId);
  });

  test('callback function is called on user interactions', async () => {
    // Arrange.
    const mockedInput = 'london';
    render(<Search onChange={mockedOnChange} />);
    const searchElement = screen.getByRole('searchbox');

    // Action.
    userEvent.type(searchElement, mockedInput);

    // Assert.
    expect(mockedOnChange).toHaveBeenCalled();
  });

  test('value is updated on user interactions', async () => {
    // Arrange.
    const mockedInput = 'london';
    render(<Search />);
    const searchElement = screen.getByRole('searchbox');

    // Action.
    userEvent.type(searchElement, mockedInput);

    // Assert.
    expect(searchElement).toHaveValue(mockedInput);
  });
});
