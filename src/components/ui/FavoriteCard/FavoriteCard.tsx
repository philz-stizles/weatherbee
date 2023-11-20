import { OpenWeather } from '../../../types';
import IconButton from '../IconButton/IconButton';
import { IoCloseOutline } from 'react-icons/io5';
import classes from './FavoriteCard.module.css';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: OpenWeather;
  onRemove?: (data: OpenWeather) => void;
};

const FavoriteCard = ({ data, onRemove }: Props) => {
  const navigate = useNavigate();

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>, data: OpenWeather) => {
      e.stopPropagation();

      onRemove && onRemove(data);
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

  return (
    <div
      className={classes['favorite-card']}
      onClick={handleNavigation.bind(null, data)}
    >
      <IconButton
        size="xs"
        className={classes['close-button']}
        icon={IoCloseOutline}
        onClick={(e) => handleRemove(e, data)}
      />

      <div className={classes.content}>
        <h4>{`${data?.name}`}</h4>
        <p>{data.main.temp}°C</p>
      </div>
    </div>
  );
};

export default FavoriteCard;
