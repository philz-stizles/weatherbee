import { ButtonHTMLAttributes } from 'react';
import classes from './IconButton.module.css';
import { IconType } from 'react-icons';
import { Size } from '../../../types';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
  size?: Size
};

const IconButton = ({ className, size = 'md',  icon: Icon, ...props }: Props) => {
  return (
    <button
      className={`${classes['icon-button']}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <Icon size={size === 'xs' ? 12 : size === 'md' ? 18: 24} />
    </button>
  );
};

export default IconButton;
