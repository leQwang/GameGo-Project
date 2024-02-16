import React, {createContext, useContext, ReactNode } from 'react'

// Create a context
const SelectedGenreContext = createContext<{
  selectedGenre: number;
  setSelectedGenre: React.Dispatch<React.SetStateAction<number>>;
}>({
  selectedGenre: 0,
  setSelectedGenre: () => {}
});

export const SelectedGenreProvider = ({ children } : {children: ReactNode}) => {
  const [selectedGenre, setSelectedGenre] = React.useState(4)

  return (
    <SelectedGenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </SelectedGenreContext.Provider>
  )
}

// Create a custom hook to use the selected genre context
export const useSelectedGenre = () => useContext(SelectedGenreContext);