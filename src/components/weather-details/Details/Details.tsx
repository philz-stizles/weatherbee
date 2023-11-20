import moment from 'moment';
import { OpenWeather } from '../../../types';
import classes from './Details.module.css';
import { InfoCard } from '../../ui';

type Props = {
  data: OpenWeather;
};

const Details = ({ data: { weather, main, wind, sys, name, dt } }: Props) => {
  return (
    <section data-testid="details" className={classes.details}>
      <div className={classes.left}>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <div className={classes.temperature}>
          <h2>{main.temp}°C</h2>
          <span>{weather[0].description}</span>
        </div>
        <div className={classes.divider}></div>
        <div className={classes.timestamp}>
          <small>{moment.unix(dt).format('Do-MMM YYYY')}</small>
          <p>{moment.unix(dt).format('dddd h:mm A')}</p>
          <small>{weather[0].icon.includes('d') ? 'Day' : 'Night'}</small>
        </div>
        <h2 className={classes.name}>
          {name}, {sys.country}
        </h2>
      </div>
      <div className={classes.right}>
        <h2>Today</h2>
        <div className={classes.grid}>
          <InfoCard
            title="Wind"
            value={`${wind.speed} km/h`}
            meta={wind?.gust?.toString()}
          />
          <InfoCard title="Humidity" value={`${main.humidity}%`} />
          <InfoCard title="Real feel" value={`${main.feels_like}°C`} />
          <InfoCard
            title="Wind Gust"
            value={wind?.gust?.toString()}
            meta="Moderate"
          />
          <InfoCard title="Pressure" value={`${main.pressure} mb`} />
          <InfoCard
            title="Temp"
            value={`${main.temp_max}°C`}
            meta={`${main.temp_min}°C`}
          />
        </div>
      </div>
    </section>
  );
};

export default Details;
