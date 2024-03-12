import { getGenres } from "../../Services/RawGApi";
import { useState, useEffect } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";

interface Genre {
  id: number;
  name: string;
}

function GenreNav() {
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
    <div id="parent" className="fixed md:relative top-0 md:flex flex-col -left-[100%] md:left-0 mt-5">
      <div id="temp" className="bg-gamecard sticky top-0 z-20 mb-10 h-fit w-fit text-nowrap rounded-xl py-2 md:left-0 md:ml-3 md:mr-5 md:block md:w-fit md:px-2">
        <h1 className="text-center text-4xl font-bold text-orange ">Genres</h1>
        <ul>
          {genres.map((genre, index) => {
            return (
              <li
                key={index}
                className={`w-52 ${selectedGenre == genre.id ? "bg-orange" : "bg-transparent hover:opacity-80"} group mx-1 my-1 rounded-md p-1 transition-all duration-100 ease-in-out before:absolute before:bottom-0 before:left-0 before:h-1 before:w-0 before:translate-y-3 before:rounded-lg   before:bg-orange before:transition-all before:duration-150 before:ease-linear before:content-[''] hover:bg-orange hover:before:w-full`}
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
    </div>
  );
}

export default GenreNav;
