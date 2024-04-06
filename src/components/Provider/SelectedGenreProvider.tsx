import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context
const SelectedGenreContext = createContext<{
  selectedGenre: number;
  setSelectedGenre: React.Dispatch<React.SetStateAction<number>>;
  selectedPlatform: number;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<number>>;
}>({
  selectedGenre: 0,
  setSelectedGenre: () => {},
  selectedPlatform: 0,
  setSelectedPlatform: () => {},
});

export const SelectedGenreProvider = ({ children } : {children: ReactNode}) => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState(0); // Default platform state

  return (
    <SelectedGenreContext.Provider value={{ selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform }}>
      {children}
    </SelectedGenreContext.Provider>
  )
}

// Create a custom hook to use the selected genre context
export const useSelectedGenre = () => useContext(SelectedGenreContext);