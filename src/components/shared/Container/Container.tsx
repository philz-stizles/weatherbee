import { PropsWithChildren } from 'react';
import classes from './Container.module.css';

type Props = {
  classNames: string;
};

const Container = ({ children }: PropsWithChildren<Props>) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
