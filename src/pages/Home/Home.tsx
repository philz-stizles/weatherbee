import WeatherCard from '../../components/ui/WeatherCard/WeatherCard';
import useQuery from '../../hooks/use-query';
import { WeatherResponse } from '../../types';
import classes from './Home.module.css';

const Home = () => {
  const { data, isLoading, error } = useQuery<WeatherResponse[]>('/', []);

  return (
    <>
      <div className={classes.grid}>
        <WeatherCard />
      </div>
    </>
  );
};

export default Home;
