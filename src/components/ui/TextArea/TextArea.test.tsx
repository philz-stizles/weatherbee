import { render, screen } from '@testing-library/react';
import TextArea from './TextArea';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe('TextArea', () => {
  test('render with initial empty value', () => {
    // Arrange.
    render(<TextArea />);

    // Assert.
    const textAreaElement = screen.getByRole('textbox');
    expect(textAreaElement).toHaveValue('');
  });

  test('render with a placeholder text', () => {
    // Arrange.
    const placeholder = 'TextArea places...';
    render(<TextArea placeholder={placeholder} />);

    // Assert.
    const textArea = screen.getByRole('textbox');
    expect(textArea).toHaveAttribute('placeholder', placeholder);
  });

  test('render with a label', () => {
    // Arrange.
    const label = 'TextArea places';
    render(<TextArea label={label} />);

    // Assert.
    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with the provided id as label "for" and input "id" attributes', () => {
    // Arrange.
    const mockedLabel = 'TextArea places';
    const mockedId = 'textArea';
    render(<TextArea id={mockedId} label={mockedLabel} />);

    // Assert.
    const labelElement = screen.getByLabelText(mockedLabel);
    const inputElement = screen.getByRole('textbox');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', mockedId);
  });

  test('callback function is called on user interactions', async () => {
    // Arrange.
    const mockedInput = 'london';
    render(<TextArea onChange={mockedOnChange} />);
    const textAreaElement = screen.getByRole('textbox');

    // Action.
    userEvent.type(textAreaElement, mockedInput);

    // Assert.
    expect(mockedOnChange).toHaveBeenCalled();
  });

  test('value is updated on user interactions', async () => {
    // Arrange.
    const mockedInput = 'london';
    render(<TextArea />);
    const textAreaElement = screen.getByRole('textbox');

    // Action.
    userEvent.type(textAreaElement, mockedInput);

    // Assert.
    expect(textAreaElement).toHaveValue(mockedInput);
  });
});
