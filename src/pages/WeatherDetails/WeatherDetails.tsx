import { useLocation } from 'react-router-dom';
import { Button, TextArea } from '../../components/ui';
import { Container } from '../../components/shared';
import { useCallback, useEffect, useState } from 'react';
import classes from './WeatherDetails.module.css';
import { OpenWeather } from '../../types';
import { IoCloudyNight, IoSunny } from 'react-icons/io5';
import moment from 'moment';

const WeatherDetails = () => {
  const { state } = useLocation();
  const { main, name, wind, weather, dt, sys } = state as OpenWeather;
  const [storedNotes, setStoredNotes] = useState(() => {
    const cachedData = localStorage.getItem(name);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      return '';
    }
  });
  const [note, setNote] = useState('');

  useEffect(() => {
    const cachedData = localStorage.getItem(name);
    if (cachedData) {
      setNote(JSON.parse(cachedData));
    }
  }, [name]);

  const handleSave = useCallback((weather: OpenWeather, note: string) => {
    if (note) {
      localStorage.setItem(weather.name, JSON.stringify(note));
      setStoredNotes(note);
    }
  }, []);

  const handleDelete = useCallback((weather: OpenWeather) => {
    localStorage.removeItem(weather.name);
    setStoredNotes('');
    setNote('');
  }, []);

  return (
    <div className={classes['weather-details']}>
      <Container className={classes.container}>
        <section className={classes.content}>
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
              <div className={classes['info-card']}>
                <h4>Wind</h4>
                <p className={classes.value}>{wind.speed} km/h</p>
                <small>{wind.gust}</small>
              </div>
              <div className={classes['info-card']}>
                <h4>Humidity</h4>
                <p className={classes.value}>{main.humidity}%</p>
              </div>
              <div className={classes['info-card']}>
                <h4>Real feel</h4>
                <p className={classes.value}>{main.feels_like}°C</p>
              </div>
              <div className={classes['info-card']}>
                <h4>Wind Gust</h4>
                <p className={classes.value}>{wind.gust}</p>
                <small>Moderate</small>
              </div>

              <div className={classes['info-card']}>
                <h4>Pressure</h4>
                <p className={classes.value}>{main.pressure} mb</p>
              </div>
              <div className={classes['info-card']}>
                <h4>Cloud Cover</h4>
                <p className={classes.value}>{main.temp_max}</p>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.notes}>
          <TextArea value={note} onChange={(e) => setNote(e.target.value)} />
          <div className={classes.actions}>
            {storedNotes ? (
              <>
                <Button
                  label="Edit"
                  onClick={handleSave.bind(null, state, note)}
                />
                <Button
                  variant="white"
                  label="Delete"
                  onClick={handleDelete.bind(null, state)}
                />
              </>
            ) : (
              <Button
                label="Save"
                onClick={handleSave.bind(null, state, note)}
              />
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default WeatherDetails;
