import { Button, TextArea } from '../../../components/ui';
import { useCallback, useEffect, useState } from 'react';
import { OpenWeather } from '../../../types';
import classes from './Notes.module.css';

type Props = {
  data: OpenWeather;
};

const Notes = ({ data }: Props) => {
  const { name } = data;
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

  const handleSave = useCallback((data: OpenWeather, note: string) => {
    if (note) {
      localStorage.setItem(data.name, JSON.stringify(note));
      setStoredNotes(note);
    }
  }, []);

  const handleDelete = useCallback((data: OpenWeather) => {
    localStorage.removeItem(data.name);
    setStoredNotes('');
    setNote('');
  }, []);

  return (
    <section data-testid="notes" className={classes.notes}>
      <TextArea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
      />
      <div className={classes.actions}>
        {storedNotes ? (
          <>
            <Button label="Edit" onClick={handleSave.bind(null, data, note)} />
            <Button
              variant="white"
              label="Delete"
              onClick={handleDelete.bind(null, data)}
            />
          </>
        ) : (
          <Button label="Save" onClick={handleSave.bind(null, data, note)} />
        )}
      </div>
    </section>
  );
};

export default Notes;
