import { memo } from 'react';
import { Container } from '../../shared';
import { useFavorites } from '../../../context/favorites-context';
import classes from './Favorites.module.css';
import { FavoriteCard } from '../../ui';

const Favorites = () => {
  const { favorites, remove } = useFavorites();

  return (
    <section className={classes.favorites}>
      <Container>
        <div className={classes.row}>
          {favorites.map((item, i) => (
            <FavoriteCard data={item} key={i} onRemove={remove} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default memo(Favorites);