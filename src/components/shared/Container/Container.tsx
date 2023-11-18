import { PropsWithChildren } from 'react';
import classes from './Container.module.css';

type Props = {
  className?: string;
};

const Container = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={`${classes.container}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
};

export default Container;
