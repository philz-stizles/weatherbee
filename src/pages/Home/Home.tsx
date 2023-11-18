import { useNavigate } from 'react-router-dom';
import { useGeoLocation } from '../../hooks/use-geolocation/use-geolocation';
import Favorites from '../../components/home/Favorites/Favorites';
import Weather from '../../components/home/Weather/Weather';
import classes from './Home.module.css';
import { useEffect } from 'react';
import { useQuery } from '../../hooks/use-query/use-query';
import { WeatherResponse } from '../../types';

const Home = () => {
  const { data: localWeather, reload } = useQuery<WeatherResponse | null>(
    null,
    null
  );
  const { data: geoPosition } = useGeoLocation({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (geoPosition) {
  //     reload(
  //       `&query=${geoPosition.coords?.latitude},${geoPosition.coords?.longitude}`
  //     );
  //   }
  // }, [geoPosition, reload]);

  // useEffect(() => {
  //   if (localWeather) {
  //     navigate(`/weather/${localWeather.location.name}`, {
  //       state: localWeather,
  //     });
  //   }
  // }, [localWeather, navigate]);

  return (
    <div className={classes.wrapper}>
      <Favorites />
      <Weather />
    </div>
  );
};

export default Home;
