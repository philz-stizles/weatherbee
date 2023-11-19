import { memo } from 'react';
import { Container } from '../../shared';
import { useFavorites } from '../../../context/favorites-context';
import classes from './Favorites.module.css';
import { FavoriteCard } from '../../ui';

const Favorites = () => {
  const { favorites, remove } = useFavorites();

  return (
    <section>
      <Container>
        <div className={`${classes.grid} no-scrollbar`}>
          {favorites
            .sort((a, b) => {
              switch (a.name > b.name) {
                case true:
                  return 1;
                case false:
                  return -1;
                default:
                  return 0;
              }
            })
            .map((item, i) => (
              <FavoriteCard data={item} key={i} onRemove={remove} />
            ))}
        </div>
      </Container>
    </section>
  );
};

export default memo(Favorites);
