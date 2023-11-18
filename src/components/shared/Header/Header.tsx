import { Logo } from '../../ui';
import Container from '../Container/Container';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Logo />
      </Container>
    </header>
  );
};

export default Header;
