import { useLocation } from 'react-router-dom';
import { Button, TextArea } from '../../components/ui';
import { Notes } from '../../components/weather-details';
import { Container } from '../../components/shared';
import { useEffect, useState } from 'react';
import classes from './WeatherDetails.module.css'

const WeatherDetails = () => {
  const [notes, setNotes] = useState([]);
  const { state } = useLocation();

  console.log(state);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <Container>
        <section></section>
        <section className={classes.notes}>
          <TextArea />
          <Button label='Save' />
        </section>
      </Container>
    </div>
  );
};

export default WeatherDetails;
