import Container from '../Container/Container';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <p className="copyright">
          © <a href="http://dspyder.com/html/kite/">Weatherbee Inc.</a> 2021,
          All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
