import { WeatherResponse } from '../../../types';
import IconButton from '../IconButton/IconButton';
import { IoCloseOutline } from 'react-icons/io5';
import classes from './FavoriteCard.module.css';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: WeatherResponse;
  onRemove?: (data: WeatherResponse) => void;
};

const FavoriteCard = ({ data, onRemove }: Props) => {
  const navigate = useNavigate();

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>, data: WeatherResponse) => {
      e.stopPropagation();

      onRemove && onRemove(data);
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

  return (
    <div
      className={classes['favorite-card']}
      onClick={handleNavigation.bind(null, data)}
    >
      <IconButton
        className={classes['close-button']}
        icon={IoCloseOutline}
        onClick={(e) => handleRemove(e, data)}
      />

      {data && (
        <div className={classes.content}>
          <h4>{`${data?.location?.name?.substring(0, 18)}`}</h4>
          <p>{data.current?.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
