import { IoThermometerOutline } from 'react-icons/io5';
import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <IoThermometerOutline size={24} />
      <h2>Weatherbee</h2>
    </div>
  );
};

export default Logo;
