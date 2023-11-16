import { PropsWithChildren, createContext, useContext } from 'react';

const FavoritesContext = createContext({});

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  return (
    <FavoritesContext.Provider value={{}}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
