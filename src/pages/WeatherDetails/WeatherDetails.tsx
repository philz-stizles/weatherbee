import { useLocation } from 'react-router-dom';
import { Container } from '../../components/shared';
import classes from './WeatherDetails.module.css';
import Details from '../../components/weather-details/Details/Details';
import { Notes } from '../../components/weather-details';

const WeatherDetails = () => {
  const { state: weather } = useLocation();

  return (
    <div data-testid="weather-details" className={classes['weather-details']}>
      <Container className={classes.container}>
        <Details data={weather} />
        <Notes data={weather} />
      </Container>
    </div>
  );
};

export default WeatherDetails;
