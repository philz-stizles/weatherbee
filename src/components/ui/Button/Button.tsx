import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';
import { Variant } from '../../../types';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  label?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
};

const Button = ({
  type = 'button',
  variant = 'primary',
  label,
  children,
  isLoading = false,
  disabled,
  ...props
}: Props) => {
  const variants: { [key: string]: string } = {
    outlined: classes.outlined,
    white: classes.white,
    primary: classes.primary,
  };
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${classes.button} ${variants[variant]}`}
      {...props}
    >
      {label ?? children}
    </button>
  );
};

export default Button;
