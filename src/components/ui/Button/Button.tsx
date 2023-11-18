import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';
import { Variant } from '../../../types';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  label?: string;
  children?: React.ReactNode;
};

const Button = ({ variant = 'primary', label, children, ...props }: Props) => {
  const variants: { [key: string]: string } = {
    outlined: classes.outlined,
    white: classes.white,
    primary: classes.primary,
  };
  return (
    <button className={`${classes.button} ${variants[variant]}`} {...props}>
      {label ?? children}
    </button>
  );
};

export default Button;
