import { getGenres, getPlatforms } from "../../Services/RawGApi";
import { useState, useEffect } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";

interface Genre {
  id: number;
  name: string;
}

interface Platform {
  id: number;
  name: string;
}

import { TiArrowSortedDown } from "react-icons/ti";

interface GenreNavProps {
  isSidenavOpen: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderType: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewSideNav: React.FC<GenreNavProps> = ({
  isSidenavOpen,
  setLoading,
  setRenderType,
}) => {
  const { selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform } = useSelectedGenre();

  // ---------------- Get Genres List -----------------

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

  // ---------------- Get Platform List -----------------
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const getPlatformsList = async (): Promise<Platform[]> => {
    const data = await getPlatforms();

    const platformsListTemp: Platform[] = data.results.map(
      (result: Platform) => ({
        id: result.id,
        name: result.name,
      }),
    );
    let tempArray = platformsListTemp.slice(0, 20);
    setPlatforms(tempArray);
    console.table(tempArray);
    return platformsListTemp;
  };

  // ---------------- Use Effect -----------------

  useEffect(() => {
    getGenresList();
    getPlatformsList();
    return () => {};
  }, []);

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

  // ---------------- Close Section -----------------
  const [isCloseGenre, setIsCloseGenre] = useState(false);
  const [isClosePlatform, setIsClosePlatform] = useState(false);

  return (
    <div
      className={`fixed top-12 flex-col lg:relative lg:top-0 lg:flex ${isSidenavOpen ? "left-0 top-10 rounded-lg bg-[#1F140A]" : "-left-[100%]"} z-20 mt-5 transition-all duration-300 ease-in-out lg:left-0`}
    >
      <div
        className={`${isSidenavOpen ? "" : "bg-gamecard"} top-0 z-20 mb-1 h-fit w-full text-nowrap rounded-xl py-2 md:left-0 md:ml-3 md:mr-5 md:block md:w-60 px-2`}
      >
        <div
          onClick={() => {
            setIsCloseGenre(!isCloseGenre);
          }}
          className="flex justify-between cursor-pointer"
        >
          <h1 className="text-center text-2xl font-bold text-orange">Genres</h1>
          <div
            className={`${isCloseGenre ? "rotate-180" : ""} flex items-center transition-all duration-100 ease-in-out`}
          >
            <TiArrowSortedDown  className="scale-150"/>
          </div>
        </div>
        <ul
          className={`relative max-h-[calc(100vh-100px)] ${isCloseGenre ? "h-0" : ""}  overflow-y-scroll transition-all duration-100 ease-in-out md:max-h-fit  lg:overflow-y-hidden`}
        >
          {genres.map((genre, index) => {
            return (
              <li
                key={index}
                className={`w-52 ${selectedGenre == genre.id ? "bg-orange" : "bg-transparent hover:opacity-80"} group mx-1 my-[5px] rounded-md p-1 transition-all duration-100 ease-in-out hover:bg-orange md:before:absolute md:before:bottom-0 md:before:left-0 md:before:h-1 md:before:w-0 md:before:translate-y-0 md:before:rounded-lg md:before:bg-orange md:before:transition-all md:before:duration-150 md:before:ease-linear md:before:content-[''] hover:md:before:w-full`}
              >
                <button
                  className={`w-full ${selectedGenre == genre.id ? "text-center font-bold" : "text-start"} transition-all duration-300 ease-in-out`}
                  onClick={() => {
                    setRenderType("GENRE");
                    setLoading(true);
                    setSelectedGenre(genre.id);
                    setSelectedPlatform(0);
                    handleScroll();
                  }}
                >
                  {genre.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ----------------------------------------------------------------- */}

      <div
        className={`${isSidenavOpen ? "" : "bg-gamecard"} top-0 z-20 mb-1 h-fit w-full text-nowrap rounded-xl py-2 md:left-0 md:ml-3 md:mr-5 md:block md:w-60 px-2`}
      >
        <div
          onClick={() => {
            setIsClosePlatform(!isClosePlatform);
          }}
          className="flex justify-between cursor-pointer"
        >
          <h1 className="text-center text-2xl font-bold text-orange">Platform</h1>
          <div
            className={`${isClosePlatform ? "rotate-180" : ""} flex items-center transition-all duration-100 ease-in-out`}
          >
            <TiArrowSortedDown className="scale-150"/>
          </div>
        </div>
        <ul
          className={`relative max-h-[calc(100vh-100px)] ${isClosePlatform ? "h-0" : ""}  overflow-y-scroll transition-all duration-100 ease-in-out md:max-h-fit  lg:overflow-y-hidden`}
        >
          {platforms.map((genre, index) => {
            return (
              <li
                key={index}
                className={`w-52 ${selectedPlatform == genre.id ? "bg-orange" : "bg-transparent hover:opacity-80"} group mx-1 my-[5px] rounded-md p-1 transition-all duration-100 ease-in-out hover:bg-orange md:before:absolute md:before:bottom-0 md:before:left-0 md:before:h-1 md:before:w-0 md:before:translate-y-0   md:before:rounded-lg md:before:bg-orange md:before:transition-all md:before:duration-150 md:before:ease-linear md:before:content-[''] hover:md:before:w-full`}
              >
                <button
                  className={`w-full ${selectedPlatform == genre.id ? "text-center font-bold" : "text-start"} transition-all duration-300 ease-in-out`}
                  onClick={() => {
                    setRenderType("PLATFORM");
                    setLoading(true);
                    setSelectedPlatform(genre.id);
                    setSelectedGenre(0);
                    handleScroll();
                  }}
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
};

export default ReviewSideNav;
