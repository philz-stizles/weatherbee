import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  children?: React.ReactNode;
};

const Button = ({ label, children, ...props }: Props) => {
  return (
    <button className={classes.button} {...props}>
      {label ?? children}
    </button>
  );
};

export default Button;
