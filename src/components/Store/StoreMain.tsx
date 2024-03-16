import React, { useEffect, useState, useRef } from "react";

import GameCard from "./GameCard";

import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import {
  getGamesByGenreAndPage,
  getGameBySearchAndPage,
} from "../../Services/RawGApi";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import primaryImage from "../../assets/images/horizon-poster.jpg";
import HFW from "../../assets/videos/HFW-trailer.mp4";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export interface GameRawGGeneral {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  ratings_count: number;
  genres: {
    id: number;
    name: string;
  }[];
}

function StoreMain({ searchValue }: { searchValue: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { selectedGenre } = useSelectedGenre();
  const [gamesList, setGamesList] = useState<GameRawGGeneral[]>([]);

  // const pageInput = document.getElementById(
  //   "selectedPagePagination",
  // ) as HTMLInputElement;
  // const headerSearchInput = document.getElementById(
  //   "headerSearchInput",
  // ) as HTMLInputElement;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.style.zIndex = "99";
        videoRef.current.play();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.style.zIndex = "0";
    }
  };

  // ------------- API calls Function -------------
  const [totalPages, setTotalPages] = React.useState(100);
  const [renderType, setRenderType] = React.useState("GENRE");

  const getGameBySearchPageFunc = async (searchValue: any, page: number) => {
    const data = await getGameBySearchAndPage(searchValue, page);
    setTotalPages(Math.floor(data.count / 12 + 1));

    const gamesListTemp: GameRawGGeneral[] = data.results.map(
      (result: GameRawGGeneral) => ({
        id: result.id,
        name: result.name,
        background_image: result.background_image,
        released: result.released,
        rating: result.rating,
        ratings_count: result.ratings_count,
        genres: result.genres,
      }),
    );

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  const getGamesByGenrePageFunc = async (genreId: number, page: number) => {
    const data = await getGamesByGenreAndPage(genreId.toString(), page);
    setTotalPages(Math.floor(data.count / 12 + 1));

    const gamesListTemp: GameRawGGeneral[] = data.results.map(
      (result: GameRawGGeneral) => ({
        id: result.id,
        name: result.name,
        background_image: result.background_image,
        released: result.released,
        rating: result.rating,
        ratings_count: result.ratings_count,
        genres: result.genres,
      }),
    );

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  // ------------- render Games -------------
  const [loading, setLoading] = useState(true);

  const isFirstLoad = useRef(true);

  // useEffect(() => {
  //   console.log("Fetching Games First Load");
  //   setRenderType("GENRE");

  //   setLoading(true);

  //   getGamesByGenrePageFunc(selectedGenre, 1)
  //     .then((gamesListTemp) => {
  //       setGamesList(gamesListTemp);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching games:", error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      return;
    }

    console.log("Searching games by name");
    setRenderType("SEARCH");

    setLoading(true);

    if (searchValue == "") {
      getGamesByGenrePageFunc(selectedGenre, 1)
        .then((gamesListTemp) => {
          // Set loaded games and update loading state to false when data is retrieved
          setGamesList(gamesListTemp);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false); // Update loading state to false in case of an error
        });
    } else {
      getGameBySearchPageFunc(searchValue, 1)
        .then((gamesListTemp) => {
          setGamesList(gamesListTemp);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }
  }, [searchValue]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    console.log("Fetching Genre by Games");
    setRenderType("GENRE");

    setLoading(true);

    getGamesByGenrePageFunc(selectedGenre, 1)
      .then((gamesListTemp) => {
        setGamesList(gamesListTemp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, [selectedGenre]);

  // useEffect(() => {
  //   console.log("Fetching data");

  //   // Determine which function to call based on the condition
  //   const fetchData = async () => {
  //     setLoading(true); // Set loading state to true when fetching starts

  //     try {
  //       console.log("Search Value: ", searchValue);
  //       if (searchValue === "") {
  //         await getGamesByGenrePageFunc(selectedGenre, 1);
  //       } else {
  //         await getGameBySearchPageFunc(searchValue, 1);
  //         headerSearchInput.value = "";
  //         // searchValue = "";
  //         // setRenderType("GENRE");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching games:", error);
  //     } finally {
  //       setLoading(false); // Update loading state to false when data fetching is done
  //     }
  //   };
  //   // console.log("Search Value: ", searchValue);
  //   // console.log("Previous Render Type: ", renderType);
  //   // setRenderType(searchValue === "" ? "GENRE" : "SEARCH");
  //   // console.log("Search Value: ", searchValue);
  //   // console.log("Previous Render Type: ", renderType);
  //   fetchData(); // Call the fetchData function
  // }, [searchValue, selectedGenre]);

  // ------------------ Pagination ------------------
  const [active, setActive] = React.useState(1);
  // const [selectedPage, setSelectedPage] = React.useState(1);

  const next = () => {
    if (active === 10) return;
    handleScrollStore();
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    handleScrollStore();
    setActive(active - 1);
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      return;
    }

    console.log("Fetching games by page ", active);
    setLoading(true);
    console.log("Active page: ", active);
    if (renderType === "GENRE") {
      getGamesByGenrePageFunc(selectedGenre, active)
        .then((gamesListTemp) => {
          setGamesList(gamesListTemp);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    } else {
      getGameBySearchPageFunc(searchValue, active)
        .then((gamesListTemp) => {
          setGamesList(gamesListTemp);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }
  }, [active]);

  // useEffect(() => {
  //   setActive(1);
  // }, [renderType, searchValue, selectedGenre]);

  // useEffect(() => {
  //   // const selectedPageInput = document.getElementById(
  //   //   "selectedPagePagination",
  //   // ) as HTMLInputElement;
  //   // selectedPageInput.value = selectedPage.toString();
  //   console.log("Selected Page: ", selectedPage);
  //   setActive(selectedPage);
  // }, [selectedPage]);

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
    <div className="relative z-10 mt-2 w-full md:mt-5">
      <div className="group">
        <LazyLoadImage
          src={primaryImage}
          alt="bg"
          className={`relative z-10 h-[25rem] object-cover transition-opacity duration-200 ease-in-out md:w-[99%] md:rounded-2xl lg:h-[27rem] xl:h-[35rem]`}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        />
        <video
          ref={videoRef}
          muted
          className="absolute top-0 h-[25rem] object-cover md:w-[99%] md:rounded-2xl lg:h-[27rem] xl:h-[35rem]"
          src={HFW}
          onEnded={handleVideoEnd}
        ></video>
      </div>

      {/* ------------------- Render Game Card -------------------- */}
      <div className="relative">
        {loading ? (
          <div className="mt-32 ring">
            Loading
            <span className="ringSpan"></span>
          </div>
        ) : (
          <div className="mx-5 my-10 grid grid-cols-1 gap-5 md:ml-0 md:mr-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gamesList.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Pagination ---------------- */}

      <div className="mb-8  flex w-full items-center justify-center gap-8">
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
              className="w-20 bg-white pl-5 text-center"
            />
            <button
              className="transition-all duration-75 ease-in-out hover:bg-orange"
              onClick={() => {
                const selectedPageInput = document.getElementById(
                  "selectedPagePagination",
                ) as HTMLInputElement;
                const inputValue = parseInt(selectedPageInput.value);
                if (!isNaN(inputValue)) {
                  // Update selected page if the input value is a valid number
                  setActive(inputValue);
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

export default StoreMain;
