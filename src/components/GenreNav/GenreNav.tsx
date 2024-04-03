import { getGenres } from "../../Services/RawGApi";
import { useState, useEffect } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";

interface Genre {
  id: number;
  name: string;
}

interface GenreNavProps {
  isSidenavOpen: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderType: React.Dispatch<React.SetStateAction<string>>;
}

const GenreNav: React.FC<GenreNavProps> = ({
  isSidenavOpen,
  setLoading,
  setRenderType,
}) => {
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

  useEffect(() => {
    console.log(isSidenavOpen);
  }, [isSidenavOpen]);

  // ---------------- Scroll Effect -----------------
  const handleScroll = () => {
    const targetElement = document.getElementById("store");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`fixed top-10 flex-col md:relative md:top-0 md:flex ${isSidenavOpen ? "left-0 top-10 rounded-lg bg-[#1F140A]" : "-left-[100%]"} z-20 mt-5 transition-all duration-300 ease-in-out md:left-0`}
    >
      <div
        className={`${isSidenavOpen ? "" : "bg-gamecard"} top-0 z-20 mb-10 h-fit w-full text-nowrap rounded-xl py-2 md:left-0 md:ml-3 md:mr-5 md:block md:w-fit md:px-2`}
      >
        <h1 className="text-center text-4xl font-bold text-orange">Genres</h1>
        <ul className="relative max-h-[calc(100vh-100px)] overflow-y-hidden md:max-h-fit md:overflow-y-hidden">
          {genres.map((genre, index) => {
            return (
              <li
                key={index}
                className={`w-52 ${selectedGenre == genre.id ? "bg-orange" : "bg-transparent hover:opacity-80"} group mx-1 my-1 rounded-md p-1 transition-all duration-100 ease-in-out before:absolute before:bottom-0 before:left-0 before:h-1 before:w-0 before:translate-y-0 before:rounded-lg   before:bg-orange before:transition-all before:duration-150 before:ease-linear before:content-[''] hover:bg-orange hover:before:w-full`}
              >
                <button
                  className={`w-full ${selectedGenre == genre.id ? "text-center font-bold" : "text-start"} transition-all duration-300 ease-in-out`}
                  onClick={() => {
                    setRenderType("GENRE");
                    setLoading(true);
                    setSelectedGenre(genre.id);
                    handleScroll();
                  }}
                >
                  {genre.name}
                </button>
              </li>
            );
          })}
        </ul>
        {/* </div> */}
      </div>
    </div>
  );
};

export default GenreNav;
