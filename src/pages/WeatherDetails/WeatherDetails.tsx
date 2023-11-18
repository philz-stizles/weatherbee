import { useLocation } from 'react-router-dom';
import { Button, TextArea } from '../../components/ui';
import { Container } from '../../components/shared';
import { useCallback, useEffect, useState } from 'react';
import classes from './WeatherDetails.module.css';
import { WeatherResponse } from '../../types';
import { IoCloudyNight, IoSunny } from 'react-icons/io5';

const WeatherDetails = () => {
  const { state } = useLocation();
  const { location, current } = state as WeatherResponse;
  const [storedNotes, setStoredNotes] = useState(() => {
    const cachedData = localStorage.getItem(location.name);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      return '';
    }
  });
  const [note, setNote] = useState('');

  useEffect(() => {
    const cachedData = localStorage.getItem(location.name);
    if (cachedData) {
      setNote(JSON.parse(cachedData));
    } 
  }, [location.name]);

  const handleSave = useCallback((weather: WeatherResponse, note: string) => {
    if (note) {
      localStorage.setItem(weather.location.name, JSON.stringify(note));
      setStoredNotes(note);
    }
  }, []);

  const handleDelete = useCallback((weather: WeatherResponse, note: string) => {
    localStorage.removeItem(weather.location.name);
    setStoredNotes('');
    setNote('');
  }, []);

  return (
    <div className={classes['weather-details']}>
      <Container className={classes.container}>
        <section className={classes.content}>
          <div className={classes.left}>
            {current.is_day ? (
              <IoSunny size={48} />
            ) : (
              <IoCloudyNight size={48} />
            )}
            <div className={classes.temperature}>
              <h2>{current.temperature}°C</h2>
              <small>{current.weather_descriptions[0]}</small>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.timestamp}>
              <p>{location.localtime}</p>
              <p>{current.is_day === 'yes' ? 'Day' : 'Night'}</p>
            </div>
            <h2>{location.name}</h2>
          </div>
          <div className={classes.right}>
            <h2>Today</h2>
            <div className={classes.grid}>
              <div className={classes['info-card']}>
                <h4>Wind</h4>
                <p className={classes.value}>{current.wind_speed}km/h</p>
                <small>{current.wind_dir}</small>
              </div>
              <div className={classes['info-card']}>
                <h4>Humidity</h4>
                <p className={classes.value}>{current.humidity}%</p>
              </div>
              <div className={classes['info-card']}>
                <h4>Real feel</h4>
                <p className={classes.value}>{current.feelslike}°C</p>
              </div>
              <div className={classes['info-card']}>
                <h4>UV Index</h4>
                <p className={classes.value}>{current.uv_index}</p>
                <small>Moderate</small>
              </div>

              <div className={classes['info-card']}>
                <h3>Pressure</h3>
                <p className={classes.value}>{current.pressure} mb</p>
              </div>
              <div className={classes['info-card']}>
                <h3>Cloud Cover</h3>
                <p className={classes.value}>{current.cloudcover}</p>
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
                  onClick={handleDelete.bind(null, state, note)}
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
