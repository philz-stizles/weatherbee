import { useLocation } from 'react-router-dom';
import { TextArea } from '../../components/ui';
import { Notes } from '../../components/weather-details';
import { Container } from '../../components/shared';
import { useEffect, useState } from 'react';

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
        <section>
          <TextArea />
          <Notes />
        </section>
      </Container>
    </div>
  );
};

export default WeatherDetails;
