import { IoThermometerOutline } from 'react-icons/io5';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/' className={classes.logo}>
      <IoThermometerOutline size={24} />
      <h2>Weatherbee</h2>
    </Link>
  );
};

export default Logo;
