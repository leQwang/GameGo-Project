import React, { useEffect, useState, useRef } from "react";

import GameCard from "./GameCard";

import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import { getGamesByGenre, getGameBySearch, getGamesByGenreAndPage, getGameBySearchAndPage } from "../../Services/RawGApi";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import primaryImage from "../../assets/images/horizon-poster.jpg";
import HFW from "../../assets/videos/HFW-trailer.mp4";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export interface Game {
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
  const [gamesList, setGamesList] = useState<Game[]>([]);

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

  const getGameBySearchFunc = async (searchValue: any) => {
    const data = await getGameBySearch(searchValue);
    setTotalPages(Math.floor(data.count / 12 + 1)); // 12 is the page size

    const gamesListTemp: Game[] = data.results.map((result: Game) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      ratings_count: result.ratings_count,
      genres: result.genres,
    }));

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  const getGameBySearchPageFunc = async (searchValue: any, page: number) => {
    const data = await getGameBySearchAndPage(searchValue, page);

    const gamesListTemp: Game[] = data.results.map((result: Game) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      ratings_count: result.ratings_count,
      genres: result.genres,
    }));

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  const getGamesByGenreFunc = async (genreId: number) => {
    const data = await getGamesByGenre(genreId.toString());
    setTotalPages(Math.floor(data.count / 12 + 1));

    const gamesListTemp: Game[] = data.results.map((result: Game) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      ratings_count: result.ratings_count,
      genres: result.genres,
    }));

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  const getGamesByGenrePageFunc = async (genreId: number, page: number) => {
    const data = await getGamesByGenreAndPage(genreId.toString(), page);

    const gamesListTemp: Game[] = data.results.map((result: Game) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      ratings_count: result.ratings_count,
      genres: result.genres,
    }));

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  // ------------- render Games -------------

  useEffect(() => {
    setRenderType("SEARCH");
    if (searchValue == "") {
      getGamesByGenreFunc(selectedGenre);
    } else {
      getGameBySearchFunc(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    setRenderType("GENRE");
    getGamesByGenreFunc(selectedGenre);
  }, [selectedGenre]);

  // ------------------ Pagination ------------------
  const [active, setActive] = React.useState(1);

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
    if (renderType === "GENRE") {
      getGamesByGenrePageFunc(selectedGenre, active);
    } else {
      getGameBySearchPageFunc(searchValue, active);
    }
  }, [active]);

  useEffect(() => {
    setActive(1);
  }, [renderType, searchValue, selectedGenre]);

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
      <div className="mx-5 my-10 grid grid-cols-1 gap-5 md:ml-0 md:mr-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gamesList.map((game, index) => {
          return <GameCard key={index} {...game} />;
        })}
      </div>

      {/* ---------------- Pagination ---------------- */}

      <div className="flex  w-full items-center justify-center gap-8 mb-8">
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
          Page <strong className="text-orange">{active}</strong> of{" "}
          <strong className="text-orange">{totalPages}</strong>
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
