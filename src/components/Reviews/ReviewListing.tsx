import { useEffect, useState, useRef } from "react";

import GameCard from "./GameCard";

import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import {
  getGamesByGenreAndPage,
  getGameBySearchAndPage,
} from "../../Services/RawGApi";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import primaryImage from "../../assets/images/horizon-poster.jpg";
// import HFW from "../../assets/videos/HFW-trailer.mp4";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import { render } from "react-dom";

import { GameRawGCard } from "../../Services/RawGApi";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { selectedGenre } = useSelectedGenre();
  const [gamesList, setGamesList] = useState<GameRawGCard[]>([]);

  const selectedPageInput = document.getElementById(
    "selectedPagePagination",
  ) as HTMLInputElement;

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
  const [totalPages, setTotalPages] = useState(100);
  const pageSize = 24;

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

  // ------------- render Games -------------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // console.log("When the search value is: ", searchValue);
    // console.log("When the genre is: ", selectedGenre);
    // console.log("When the render type is: ", renderType);
    // console.log("-------------------------------------");
    if (isFirstLoad.current) {
      // If first load: render game by genre
      renderGamesByGenre();

      isFirstLoad.current = false;
    } else {
      // If not first load: render games
      renderGames();
    }
  }, [searchValue, selectedGenre]);

  const renderGamesByGenre = async () => {
    setRenderType("GENRE");

    setLoading(true);

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
    }
    // ** If search value is not empty, render games by search
    else {
      if (searchValue === "") {
        return;
      }
      // setRenderType("GENRE");
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

  // ------------------- Keen Slider --------------------
  // const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
  //   slidesPerView: 1,
  //   spacing: 15,
  //   centered: false,
  //   vertical: false,
  //   loop: true,
  //   mode: "snap",
  //   duration: 500,
  //   breakpoints: {
  //     "(min-width: 768px)": {
  //       slidesPerView: 2,
  //     },
  //     "(min-width: 1200px)": {
  //       slidesPerView: 3,
  //     },
  //   },
  // });

  return (
    <div className="relative z-10 mt-2 w-full md:mt-5">
      <div className="relative group overflow-hidden md:w-[99%] md:rounded-2xl lg:h-[27rem] 2xl:h-[28rem]">
        <LazyLoadImage
          src={primaryImage}
          alt="bg"
          className={`relative z-10 h-[25rem] w-full object-cover transition-opacity duration-200 ease-in-out md:h-full`}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        />
        <video
          ref={videoRef}
          muted
          className="absolute top-0 h-[25rem] w-full object-cover md:h-full "
          src={
            "http://cdn.akamai.steamstatic.com/steam/apps/257007287/movie_max_vp9.webm?t=1711032973"
          }
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
                if (!isNaN(inputValue)) {
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
