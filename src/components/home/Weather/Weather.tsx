import { Container } from '../../shared';
import { Search, WeatherCard } from '../../ui';
import { largestCities } from '../../../constants';
import { useEffect, useState } from 'react';
import classes from './Weather.module.css';
import { useDebounce } from '../../../hooks/use-debounce/use-debounce';

const Weather = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce(search);

  useEffect(() => {
    setCities(largestCities);
  }, []);

  useEffect(() => {
    debounceValue && setCities([debounceValue]);
  }, [debounceValue]);

  const handleRemove = (city: string) => {
    setCities((prevState) => {
      return prevState.filter((item) => item !== city);
    });
  };

  return (
    <section>
      <Container>
        <div className={classes.content}>
          <Search
            value={search}
            placeholder="Search cities, locations"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={classes.grid}>
            {cities.map((city) => (
              <WeatherCard
                key={city}
                city={city}
                onRemove={handleRemove.bind(null, city)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Weather;
