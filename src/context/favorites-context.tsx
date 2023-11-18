import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { OpenWeather } from '../types';

const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const INIT_FAVORITES = 'INIT_FAVORITES';
export const FAVORITES_STORE = 'FAVORITES_STORE';

type ContextType = {
  favorites: OpenWeather[];
  add: (weather: OpenWeather) => void;
  remove: (weather: OpenWeather) => void;
};

const FavoritesContext = createContext<ContextType>({
  favorites: [],
  add: (weather: OpenWeather) => {},
  remove: (weather: OpenWeather) => {},
});

type StateType = {
  favorites: OpenWeather[];
  isLoading: boolean;
};

type ActionType =
  | { type: 'REMOVE_FROM_FAVORITES'; payload: OpenWeather }
  | { type: 'ADD_TO_FAVORITES'; payload: OpenWeather }
  | { type: 'INIT_FAVORITES'; payload: OpenWeather[] };

const reducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case INIT_FAVORITES: {
      return { ...state, favorites: [...payload] };
    }
    case ADD_TO_FAVORITES: {
      return { ...state, favorites: [...state.favorites, payload] };
    }
    case REMOVE_FROM_FAVORITES:
      {return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.name !== payload.name
        ),
      };}
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      favorites: [],
      isLoading: false,
    },
    () => {
      const storedFavorites = localStorage.getItem(FAVORITES_STORE);

      return {
        isLoading: false,
        favorites:
          storedFavorites && storedFavorites !== 'undefined'
            ? JSON.parse(storedFavorites)
            : [],
      };
    }
  );
  const { favorites } = state;

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORE, JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = useCallback((weather: OpenWeather) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: weather });
  }, []);

  const handleRemoveFromFavorites = useCallback((weather: OpenWeather) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: weather });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        add: handleAddToFavorites,
        remove: handleRemoveFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
