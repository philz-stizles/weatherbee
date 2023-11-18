import { useLocation } from 'react-router-dom';
import { Button, TextArea } from '../../components/ui';
import { Container } from '../../components/shared';
import { useCallback, useEffect, useState } from 'react';
import classes from './WeatherDetails.module.css';
import { WeatherResponse } from '../../types';
import { IoCloudyNight, IoSunny } from 'react-icons/io5';

const WeatherDetails = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string>('');
  const { state } = useLocation();
  const { location, current } = state as WeatherResponse;

  useEffect(() => {
    const cachedData = localStorage.getItem(location.name);
    if (cachedData) {
      // If data is already in the cache, return it
      setNotes(JSON.parse(cachedData) as string);
      setNote(JSON.parse(cachedData) as string);
    }
    return () => {
      // if (notes.length > 0) {
      //   // Cache the data in localStorage
      //   localStorage.setItem(location.name, JSON.stringify(notes));
      // }
      if (notes) {
        // Cache the data in localStorage
        localStorage.setItem(location.name, JSON.stringify(notes));
      }
    };
  }, [notes, location]);

  const handleSave = useCallback((note: string) => {
    if (note) {
      // setNotes((prevState) => ({ ...prevState }));
      setNotes(note);
      setNote('');
    }
  }, []);

   const handleEdit = useCallback((weather: WeatherResponse, note: string) => {
     if (note) {
       // setNotes((prevState) => ({ ...prevState }));
       setNotes(note);
       setNote('');
     }
   }, []);

    const handleDelete = useCallback((weather: WeatherResponse, note: string) => {
      if (note) {
        // setNotes((prevState) => ({ ...prevState }));
        setNotes(note);
        setNote('');
      }
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
              <h2>{current.temperature} C</h2>
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
                <p className={classes.value}>{current.feelslike}C</p>
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
            {notes ? (
              <>
                <Button label="Edit" onClick={handleEdit.bind(null, state, note)} />
                <Button variant='white' label="Delete" onClick={handleDelete.bind(null, state,  note)} />
              </>
            ) : (
              <Button label="Save" onClick={handleSave.bind(null, note)} />
            )}
          </div>

        </section>
      </Container>
    </div>
  );
};

export default WeatherDetails;
