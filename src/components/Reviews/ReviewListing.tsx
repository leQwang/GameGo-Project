import { useEffect, useState, useRef } from "react";

import GameCard from "./GameCard";

import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import {
  getGamesByGenreAndPage,
  getGameBySearchAndPage,
  getGamesByPlatformAndPage,
  getGameMain
} from "../../Services/RawGApi";

import "react-lazy-load-image-component/src/effects/blur.css";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { GameRawGCard } from "../../Services/RawGApi";
import VideoBanner from "./VideoBanner";

interface ListingMainProps {
  searchValue: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  renderType: string;
  setRenderType: React.Dispatch<React.SetStateAction<string>>;
}

function ReviewListing({
  searchValue,
  loading,
  setLoading,
  renderType,
  setRenderType,
}: ListingMainProps) {
  const { selectedGenre, selectedPlatform } = useSelectedGenre();
  const [gamesList, setGamesList] = useState<GameRawGCard[]>([]);

  const selectedPageInput = document.getElementById(
    "selectedPagePagination",
  ) as HTMLInputElement;

  // ------------- API calls Function -------------
  const [totalPages, setTotalPages] = useState(100);
  const pageSize = 24;

  const getGamesMain = async (page: number) => {
    try {
      const data = await getGameMain(
        pageSize,
        page,
      );
      // console.log(data.count, pageSize);
      setTotalPages(Math.floor(data.count / pageSize + 1));

      const gamesListTemp: GameRawGCard[] = data.results;

      setGamesList(gamesListTemp);
      return gamesListTemp;
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  const getGameBySearchPageFunc = async (searchValue: any, page: number) => {
    try {
      // console.log("Fetching games by search: ", searchValue, page);
      const data = await getGameBySearchAndPage(searchValue, pageSize, page);
      setTotalPages(Math.floor(data.count / pageSize + 1));

      const gamesListTemp: GameRawGCard[] = data.results;

      setGamesList(gamesListTemp);
      return gamesListTemp;
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const getGamesByGenrePageFunc = async (genreId: number, page: number) => {
    try {
      const data = await getGamesByGenreAndPage(
        genreId.toString(),
        pageSize,
        page,
      );
      // console.log(data.count, pageSize);
      setTotalPages(Math.floor(data.count / pageSize + 1));

      const gamesListTemp: GameRawGCard[] = data.results;

      setGamesList(gamesListTemp);
      return gamesListTemp;
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const getGamesByPlatformAndPageFunc = async (platformId: number, page: number) => {
    try {
      const data = await getGamesByPlatformAndPage(
        platformId.toString(),
        pageSize,
        page,
      );
      // console.log(data.count, pageSize);
      setTotalPages(Math.floor(data.count / pageSize + 1));

      const gamesListTemp: GameRawGCard[] = data.results;

      setGamesList(gamesListTemp);
      return gamesListTemp;
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  // ------------- render Games -------------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    console.log("When the search value is: ", searchValue);
    console.log("When the genre is: ", selectedGenre);
    console.log("When the platform is: ", selectedPlatform);
    console.log("When the render type is: ", renderType);
    // console.log("-------------------------------------");
    if (isFirstLoad.current) {
      // If first load: render game by genre
      renderGamesMain();

      isFirstLoad.current = false;
    } else {
      // If not first load: render games
      renderGames();
    }
  }, [searchValue, selectedGenre, selectedPlatform]);

  const renderGamesMain = async () => {
    setRenderType("MAIN");

    setLoading(true);

    getGamesMain(1)
      .then((gamesListTemp) => {
        if (gamesListTemp) {
          setGamesList(gamesListTemp);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  };

  const renderGames = async () => {
    setLoading(true);
    // ** If search value is empty, render games by genre
    setActive(1);
    if (renderType === "GENRE") {
      // setRenderType("SEARCH");

      getGamesByGenrePageFunc(selectedGenre, 1)
        .then((gamesListTemp) => {
          if (gamesListTemp) {
            setGamesList(gamesListTemp);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }else if(renderType === "PLATFORM"){
      //render type PLATFORM
      getGamesByPlatformAndPageFunc(selectedPlatform, 1)
        .then((gamesListTemp) => {
          if (gamesListTemp) {
            setGamesList(gamesListTemp);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }else {     // ** If search value is not empty, render games by search
      if (searchValue === "") {
        // which mean you delete the current search value
        getGamesByGenrePageFunc(selectedGenre, 1)
        .then((gamesListTemp) => {
          if (gamesListTemp) {
            setGamesList(gamesListTemp);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
      }
      // console.log("Search: ", searchValue);
      getGameBySearchPageFunc(searchValue, 1)
        .then((gamesListTemp) => {
          if (gamesListTemp) {
            setGamesList(gamesListTemp);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }
  };

  // ------------------ Pagination ------------------
  const [active, setActive] = useState(1);
  // const [selectedPage, setSelectedPage] = useState(1);

  // Set loading on the click to prevent running the if else statement rendering the GameCard
  const next = () => {
    if (active === 10) return;
    setLoading(true);
    handleScrollStore();
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setLoading(true);
    handleScrollStore();
    setActive(active - 1);
  };

  useEffect(() => {
    if (active === 1) {
      // console.log("Initial render");
      return;
    } else {
      console.log("Fetching games by page ", active);
      if (renderType === "GENRE") {
        console.log("Fetching games by genre: ");
        getGamesByGenrePageFunc(selectedGenre, active)
          .then((gamesListTemp) => {
            if (gamesListTemp) {
              setGamesList(gamesListTemp);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
            setLoading(false);
          });
      } else if(renderType === "PLATFORM"){
        console.log("Fetching games by platform: ");
        getGamesByPlatformAndPageFunc(selectedPlatform, active)
          .then((gamesListTemp) => {
            if (gamesListTemp) {
              setGamesList(gamesListTemp);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
            setLoading(false);
          });
      } else if(renderType === "MAIN"){
        console.log("Fetching games by main: ");
        getGamesMain(active)
          .then((gamesListTemp) => {
            if (gamesListTemp) {
              setGamesList(gamesListTemp);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
            setLoading(false);
          });
      
      } else {
        console.log("Active search: ", searchValue);
        getGameBySearchPageFunc(searchValue, active)
          .then((gamesListTemp) => {
            if (gamesListTemp) {
              setGamesList(gamesListTemp);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
            setLoading(false);
          });
      }
    }
  }, [active]);

  // -------------------- Scroll Effect --------------------
  // when change pagination, scroll to top for user to scroll down again -> increase UX
  const handleScrollStore = () => {
    const targetElement = document.getElementById("store");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative z-10 mt-2 w-full md:mt-5 min-h-screen">
      <VideoBanner />
      {/* ------------------- Render Game Card -------------------- */}
      {renderType === "MAIN" ? (
        <div className="text-5xl font-semibold mt-5 mx-5 md:mx-3">NEWS and TRENDING</div>
      ): ""}
      {renderType === "GENRE" ? (
        <div className="text-5xl font-semibold mt-5 mx-5 md:mx-3">{selectedGenre}</div>
      ): ""}
      {renderType === "PLATFORM" ? (
        <div className="text-5xl font-semibold mt-5 mx-5 md:mx-3">{selectedPlatform}</div>
      ): ""}
      <div className="relative">
        {loading ? (
          <div className={`${renderType !== "MAIN" ? "mt-32" : "mt-20"} ring`}>
            Loading
            <span className="ringSpan"></span>
          </div>
        ) : (
          <div className="mx-5 my-3 grid grid-cols-1 gap-5 md:mx-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gamesList.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Pagination ---------------- */}

      <div className="my-2 mb-8 flex w-full items-center justify-center gap-8">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={active === 1}
          placeholder=""
          className="border-white"
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
        </IconButton>
        <Typography color="white" className="font-normal" placeholder="">
          Page{" "}
          <div className="inline-flex h-full items-center overflow-hidden rounded-md bg-white text-black">
            <input
              id="selectedPagePagination"
              type="number"
              placeholder={active.toString()}
              // value={active.toString()}
              className="w-20 bg-white pl-5 text-center"
            />
            <button
              className="transition-all duration-75 ease-in-out hover:bg-orange"
              onClick={() => {
                const inputValue = parseInt(selectedPageInput.value);
                if (!isNaN(inputValue) && inputValue > 0 && inputValue <= totalPages) {
                  // Update selected page if the input value is a valid number
                  setActive(inputValue);
                  selectedPageInput.value = ""; // Clear the input value
                } else {
                  // Handle invalid input (e.g., non-numeric input)
                  console.error("Invalid input value");
                }
              }}
            >
              🔍
            </button>
          </div>{" "}
          of <strong className="text-orange">{totalPages}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={active === totalPages}
          placeholder=""
          className="border-white"
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
        </IconButton>
      </div>
    </div>
  );
}

export default ReviewListing;
