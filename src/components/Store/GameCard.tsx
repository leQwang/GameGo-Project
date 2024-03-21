import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameRawGCard } from "../../Services/RawGApi";

import "../../index.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// import {
//   getExactGameByName,
//   // getPriceListByName,
//   getGameById,
// } from "../../Services/CheapSharkApi";

export interface GameCardCheapSharkOverview {
  gameID: number;
  steamAppID: number;
  cheapest: number;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}

// interface GameCheapSharkDetails {
//   info: {
//     title: string;
//     steamAppID: string;
//     thumb: string;
//   };
//   cheapestPriceEver: {
//     price: string;
//     date: number;
//   };
//   deals: {
//     storeID: string;
//     dealID: string;
//     price: string;
//     retailPrice: number;
//     savings: number;
//   }[];
// }

function GameCard(gameRawG: GameRawGCard) {
  // --------------- constants ---------------
  // const regionalPriceRate = 1;

  // --------------- image loading process ---------------
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // --------------- fetch Game by Name details ---------------
  // const [gameOverview, setGameOverview] =
  //   useState<GameCardCheapSharkOverview | null>();

  //**search for exact
  // const fetchGameOverview = async (gameSlug: string) => {
  //   try {
  //     const gameTitle = gameSlug.replace(/-/g, "");
  //     const exactGame = await getExactGameByName(gameTitle);
  //     if (exactGame === undefined || exactGame.length === 0) {
  //       console.log("Game not found", gameTitle);
  //       // ***if the game is not found, then search for other relevant game
  //       // let relevantGame = await fetchGameListOverview(gameTitle);
  //       // if (relevantGame === null) {
  //       //   // if the relevant game is not found, then set gameOverview to null
  //       //   setGameOverview(null);
  //       // } else {
  //       //   setGameOverview(relevantGame[0]);
  //       // }
  //       // ***
  //       return;
  //     } else {
  //       setGameOverview(exactGame[0]);
  //       const gameDetailResult = await fetchGameDetails(exactGame[0].gameID);
  //       setGameDetail(gameDetailResult);
  //     }
  //     // return exactGame;
  //   } catch (error) {
  //     console.error("Error fetching game details:", error);
  //     setGameOverview(null);
  //   }
  // };

  //*** get the price from other relevant search
  // const fetchGameListOverview = async (gameTitle: string) => {
  //   try {
  //     const gameListData = await getPriceListByName(gameTitle.toUpperCase());
  //     console.log(gameListData);
  //     if (gameListData === undefined || gameListData.length === 0) {
  //       return null;
  //     }
  //     return gameListData;
  //   } catch (error) {
  //     console.error("Error fetching gameList Overview details:", error);
  //   }
  // };
  //***

  useEffect(() => {
    console.log(gameRawG);
    console.log("Metacritic Score " + gameRawG.name);
    console.log("Review Count " + gameRawG.reviews_count);
    // fetchGameOverview(gameRawG.slug.toUpperCase());
  }, [gameRawG]);

  // --------------- fetch Game Detail by Id ---------------
  // this step helps getting the game Saving price
  // const [gameDetail, setGameDetail] = useState<GameCheapSharkDetails | null>();

  // const fetchGameDetails = async (gameId: number) => {
  //   try {
  //     const gameDetailTemp = await getGameById(gameId);
  //     // console.log(gameDetailTemp);
  //     if (gameDetailTemp === undefined || gameDetailTemp.length === 0) {
  //       return null;
  //     }
  //     // setGameDetail(gameDetailTemp);
  //     return gameDetailTemp;
  //   } catch (error) {
  //     console.error("Error fetching gameDetail:", error);
  //   }
  // };

  // ----------------- redirect to the game detail -----------------
  // const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to GameDetail component with the game ID
    window.open(`/game/${gameRawG.id}`, '_blank');
  };

  return (
    <li
      key={gameRawG.id}
      onClick={handleClick}
      className="bg-gamecard xl:h-92 group relative flex w-full flex-col overflow-hidden rounded-xl transition-all duration-100 ease-in-out hover:z-10 hover:scale-105 hover:cursor-pointer hover:overflow-visible hover:rounded-t-xl hover:bg-orangeCard hover:shadow-lg md:hover:rounded-b-none"
    >
      <LazyLoadImage
        src={gameRawG.background_image}
        alt={gameRawG.name}
        className={`${imageLoaded ? "h-40" : "h-0"} w-full overflow-hidden rounded-t-xl object-cover`}
        effect="blur"
        onLoad={handleImageLoad} // Set onLoad event handler to update imageLoaded state
      />

      {!imageLoaded && (
        <div className="animated-background">
          <div className="background-masker"></div>
        </div>
      )}

      <div className="flex flex-grow flex-col px-2 pb-2">
        <div className="flex-grow font-sans text-xl font-semibold xl:text-2xl">
          {gameRawG.name}
        </div>
        <div className="mt-1 flex w-full justify-between">
          <p className="mt-auto flex ">Rating: {gameRawG.rating}⭐</p>

          <div
            className={`w-fit rounded-sm border px-2 font-bold ${
              Number(gameRawG.metacritic) >= 80
                ? "border-green-500 text-green-500"
                : Number(gameRawG.metacritic) < 50
                  ? "border-red-500 text-red-500"
                  : "border-yellow-600 text-yellow-600"
            } ${gameRawG.metacritic === null ? "hidden" : "visible"}`}
          >
            {gameRawG.metacritic}
          </div>
        </div>
        {/* {gameOverview !== null ? (
            // if gameOverview.steamAppID is not null, then it is available on steam
            <>
              <p className="mt-auto flex items-center">
                Price {" : "}
                <span className="h-full text-sm text-white line-through opacity-70">
                  ${gameDetail?.deals[0].retailPrice}
                </span>{" "}
                <span className="mr-auto h-full text-xl font-bold">
                  {" $"}
                  {Number(
                    Number(gameDetail?.deals[0].price ?? 0) * regionalPriceRate,
                  ).toFixed(2)}
                </span>
                <div className="h-full rounded-md bg-orange font-bold text-white">
                  {"-"}
                  {Number(
                    (gameDetail?.deals[0].savings ?? 0) * regionalPriceRate,
                  ).toFixed(2)}
                  {"%"}
                </div>
              </p>
            </>
          ) : (
            <p>Unable to get Price</p>
          )} */}
        {/* --------------------------------------- */}
        <div className="relative left-0 w-full -translate-y-[1px] pb-2 transition-opacity duration-200 ease-in-out group-hover:opacity-100 md:absolute md:top-[100%] md:rounded-b-xl md:bg-orangeCard md:px-2 md:opacity-0">
          <p>Released: {gameRawG.released}</p>
          <p>Ratings Count: {gameRawG.ratings_count}</p>
          <p>
            Genres:{" "}
            {gameRawG.genres.map((genre: { name: string }, index: number) => (
              <span key={index}>
                {index > 0 ? `, ${genre.name}` : genre.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </li>
  );
}

export default GameCard;
