import { useLocation } from 'react-router-dom';
import { Button, TextArea } from '../../components/ui';
import { Container } from '../../components/shared';
import { useCallback, useEffect, useState } from 'react';
import classes from './WeatherDetails.module.css';
import { OpenWeather } from '../../types';
import Details from '../../components/weather-details/Details/Details';

const WeatherDetails = () => {
  const { state } = useLocation();
  const { name } = state as OpenWeather;
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
        <Details data={state} />
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
