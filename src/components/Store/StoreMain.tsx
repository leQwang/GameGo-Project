import { useEffect, useState, useRef } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import { getGamesByGenre, getGameBySearch } from "../../Services/RawGApi";
import GameCard from "./GameCard";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import primaryImage from "../../assets/images/horizon-poster.jpg";
import HFW from "../../assets/videos/HFW-trailer.mp4";

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

  const getGameBySearchFunc = async (searchValue: any) => {
    const data = await getGameBySearch(searchValue);

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
    console.log(searchValue);
    if (searchValue == "") {
      getGamesByGenreFunc(selectedGenre);
    } else {
      getGameBySearchFunc(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    getGamesByGenreFunc(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="relative z-10 mt-2 w-full md:mt-5">
      <div className="group">
        <LazyLoadImage
          src={primaryImage}
          alt="bg"
          className={`relative z-10 h-96 object-cover transition-opacity duration-200 ease-in-out md:w-[99%] md:rounded-2xl`}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        />
        <video
          ref={videoRef}
          muted
          className="absolute top-0 h-96 object-cover md:w-[99%] md:rounded-2xl"
          src={HFW}
          onEnded={handleVideoEnd}
        ></video>
      </div>

      <div className="mx-5 my-10 grid grid-cols-1 gap-5 md:ml-0 md:mr-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gamesList.map((game, index) => {
          return <GameCard key={index} {...game} />;
        })}
      </div>
    </div>
  );
}

export default StoreMain;
