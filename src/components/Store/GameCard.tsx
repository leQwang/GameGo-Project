import { useEffect, useState } from "react";

import { GameRawGGeneral } from "./StoreMain";

import "../../index.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
  getExactGameByName,
  getPriceListByName,
} from "../../Services/CheapSharkApi";

export interface GameCardCheapShark {
  gameID: number;
  steamAppID: number;
  cheapest: number;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}

function GameCard(game: GameRawGGeneral) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // --------------- fetch game details ---------------
  const [gameDetails, setGameDetails] = useState<GameCardCheapShark | null>();

  //search for exact
  const fetchGameDetails = async (gameTitle: string) => {
    try {
      const data = await getExactGameByName(gameTitle);
      if (data === undefined || data.length === 0) {
        let temp = await fetchGameListDetails(gameTitle);
        if (temp === null) {
          setGameDetails(null);
        }
        setGameDetails(temp[0]);
        return;
      } else {
        setGameDetails(data[0]);
      }
      return data;
    } catch (error) {
      console.error("Error fetching game details:", error);
      setGameDetails(null);
    }
  };

  //get the price from other relevant search
  const fetchGameListDetails = async (gameTitle: string) => {
    try {
      const gameListData = await getPriceListByName(gameTitle.toUpperCase());
      console.log(gameListData);
      if (gameListData === undefined || gameListData.length === 0) {
        console.log("No game found");
        return null;
      }
      return gameListData;
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  useEffect(() => {
    fetchGameDetails(game.name.toUpperCase());
    console.log("fetching game details for", game.name);
    console.log("cheapest", gameDetails?.cheapest);
  }, [game]);

  return (
    <a href={`${gameDetails !== null ? "https://www.cheapshark.com/redirect?dealID=" + gameDetails?.cheapestDealID + "&k=1" : ""}`} target="_blank">
      <li
        key={game.id}
        className="bg-gamecard xl:h-92 group relative flex w-full flex-col overflow-hidden rounded-xl transition-all duration-100 ease-in-out hover:z-10 hover:scale-105 hover:cursor-pointer hover:overflow-visible hover:rounded-t-xl hover:bg-orangeCard hover:shadow-lg md:hover:rounded-b-none"
      >
        <LazyLoadImage
          src={game.background_image}
          alt={game.name}
          className={`${imageLoaded ? "h-40" : "h-0"} w-full overflow-hidden rounded-t-xl object-cover`}
          effect="blur"
          onLoad={handleImageLoad} // Set onLoad event handler to update imageLoaded state
        />
        {/* <div className="animated-background">
        <div className="background-masker"></div>
      </div> */}
        {!imageLoaded && (
          <div className="animated-background">
            <div className="background-masker"></div>
          </div>
        )}

        <div className="flex flex-grow flex-col px-2">
          <div className="flex-grow text-xl xl:text-3xl">{game.name}</div>
          <p className="mt-auto ">Rating⭐: {game.rating}</p>
          {gameDetails !== null ? (
            <p className="mt-auto ">Cheapest: ${gameDetails?.cheapest}</p>
          ) : (
            <p>Unable to get Price</p>
          )}
          {/* <p className="mt-auto ">Cheapest💸: {gameDetails?.cheapest}</p> */}
          <div className="relative left-0 w-full -translate-y-[1px] pb-2 transition-opacity duration-200 ease-in-out group-hover:opacity-100 md:absolute md:top-[100%] md:rounded-b-xl md:bg-orangeCard md:px-2 md:opacity-0">
            <p>Released: {game.released}</p>
            <p>Ratings Count: {game.ratings_count}</p>
            <p>
              Genres:{" "}
              {game.genres.map((genre, index) => (
                <span key={index}>
                  {index > 0 ? `, ${genre.name}` : genre.name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </li>
    </a>
  );
}

export default GameCard;
