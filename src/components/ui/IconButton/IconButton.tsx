import { ButtonHTMLAttributes } from 'react';
import classes from './IconButton.module.css';
import { IconType } from 'react-icons';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
};

const IconButton = ({ className, icon: Icon, ...props }: Props) => {
  return (
    <button
      className={`${classes['icon-button']}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <Icon size={18} />
    </button>
  );
};

export default IconButton;
