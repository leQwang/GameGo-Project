import { getGenres } from "../../Services/RawGApi";
import React, { useState, useEffect } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";

interface Genre {
  id: number;
  name: string;
}

function Sidenav() {
  const { setSelectedGenre, selectedGenre } = useSelectedGenre();

  const [genres, setGenres] = useState<Genre[]>([]);

  const getGenresList = async (): Promise<Genre[]> => {
    const data = await getGenres();

    const genresListTemp: Genre[] = data.results.map((result: Genre) => ({
      id: result.id,
      name: result.name,
    }));

    setGenres(genresListTemp);

    return genresListTemp;
  };

  useEffect(() => {
    getGenresList();
    return () => {};
  }, []);

  return (
    <div className="bg-gamecard sticky top-5 mx-3 h-fit text-nowrap rounded-xl px-2 py-2">
      <h1 className="text-center text-2xl font-bold text-orange">Genres</h1>
      <ul>
        {genres.map((genre, index) => {
          return (
            <li
              key={index}
              className={`w-full ${selectedGenre == genre.id ? "bg-orange" : "bg-transparent"}`}
            >
              <button
                className={`w-full ${selectedGenre == genre.id ? "text-center font-bold" : "text-start"} transition-all duration-300 ease-in-out`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidenav;
