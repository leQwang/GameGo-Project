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
    <div className="bg-gamecard relative -left-[100%] w-0 md:w-fit md:left-0 md:sticky top-5 md:mr-5 md:ml-3 h-fit text-nowrap rounded-xl md:px-2 py-2 mb-10">
      <h1 className="text-center text-4xl font-bold text-orange">Genres</h1>
      <ul>
        {genres.map((genre, index) => {
          return (
            <li
              key={index}
              className={`w-52 ${selectedGenre == genre.id ? "bg-orange" : "bg-transparent hover:opacity-80"} mx-1 my-1 rounded-md p-1 transition-all duration-100 ease-in-out group hover:bg-orange`}
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
