import { WeatherResponse } from '../../../types';
import IconButton from '../IconButton/IconButton';
import {
  IoCloseOutline,
  IoHeart,
  IoHeartOutline,
  IoSunny,
} from 'react-icons/io5';
import classes from './WeatherCard.module.css';
import { useQuery } from '../../../hooks/use-query/use-query';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, memo, useCallback, useMemo } from 'react';
import { useFavorites } from '../../../context/favorites-context';

type Props = {
  city?: string;
  onRemove?: () => void;
};

const WeatherCard = ({ city, onRemove }: Props) => {
  const { data, error } = useQuery<WeatherResponse | null>(
    `&query=${city}`, // '/',
    null
  );
  const navigate = useNavigate();
  const { add, favorites } = useFavorites();

  const isFavorite = useMemo(() => {
    return favorites.some(weather => weather.location.name === data?.location.name)
  }, [data?.location.name, favorites]);

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onRemove && onRemove();
    },
    [onRemove]
  );

  const handleNavigation = useCallback(
    (weather?: WeatherResponse) => {
      weather &&
        navigate(`/weather/${weather.request?.query}`, {
          state: weather,
        });
    },
    [navigate]
  );

  const handleAddToFavorite = useCallback(
    (weather: WeatherResponse) => {
      add(weather);
    },
    [add]
  );
  

  if (error || !data) {
    return null;
  }

  return (
    <div
      className={classes['weather-card']}
      onClick={handleNavigation.bind(null, data)}
    >
      <IconButton
        className={classes['close-button']}
        icon={IoCloseOutline}
        onClick={handleRemove}
      />

      <IconButton
        className={classes.favorite}
        icon={isFavorite ? IoHeart : IoHeartOutline }
        onClick={(e) => {
          e.stopPropagation();
          handleAddToFavorite(data);
        }}
      />

      {data && (
        <div className={classes.content}>
          <h4>{`${data?.location?.name?.substring(0, 18)}`}</h4>
          <IoSunny className={classes.icon} size={32} />
          <p className={classes.temperature}>{data?.current?.temperature}°C</p>
          {/* <p>Weather: {data?.current?.weather_descriptions[0]}</p> */}
        </div>
      )}
    </div>
  );
};

export default memo(WeatherCard);
