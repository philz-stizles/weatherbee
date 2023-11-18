import { OpenWeather} from '../../../types';
import IconButton from '../IconButton/IconButton';
import {
  IoCloseOutline,
  IoCloudyNight,
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
  const { data, error } = useQuery<OpenWeather | null>(`?q=${city}&units=metric`, null);
  const navigate = useNavigate();
  const { add, remove, favorites } = useFavorites();

  const isFavorite = useMemo(() => {
    return favorites.some(
      (weather) => weather.name === data?.name
    );
  }, [data?.name, favorites]);

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onRemove && onRemove();
    },
    [onRemove]
  );

  const handleNavigation = useCallback(
    (weather?: OpenWeather) => {
      weather &&
        navigate(`/weather/${weather.name}`, {
          state: weather,
        });
    },
    [navigate]
  );

  const handleAddToFavorite = useCallback(
    (weather: OpenWeather) => {
      add(weather);
    },
    [add]
  );

  const handleRemoveFromFavorite = useCallback(
    (weather: OpenWeather) => {
      remove(weather);
    },
    [remove]
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
        icon={isFavorite ? IoHeart : IoHeartOutline}
        onClick={(e) => {
          e.stopPropagation();
          if (isFavorite) {
            handleRemoveFromFavorite(data);
          } else {
            handleAddToFavorite(data);
          }
        }}
      />

      {data && (
        <div className={classes.content}>
          <h4>{`${data.name?.substring(0, 18)}`}</h4>
          {data?.base ? (
            <IoSunny className={classes.icon} size={32} />
          ) : (
            <IoCloudyNight className={classes.icon} size={32} />
          )}
          <p className={classes.temperature}>{data?.main.temp}°C</p>
        </div>
        // <div className={classes.content}>
        //   <h4>{`${data?.location?.name?.substring(0, 18)}`}</h4>
        //   {data?.current.is_day ? (
        //     <IoSunny className={classes.icon} size={32} />
        //   ) : (
        //     <IoCloudyNight className={classes.icon} size={32} />
        //   )}
        //   <p className={classes.temperature}>{data?.current?.temperature}°C</p>
        // </div>
      )}
    </div>
  );
};

export default memo(WeatherCard);
