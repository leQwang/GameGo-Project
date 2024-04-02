import { useEffect, useState } from "react";
// import parse from "html-react-parser";

import { useParams } from "react-router-dom";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

//interface
import {
  GameRawGGeneral,
  GameStoreLink,
  GameScreenShotRawG,
} from "../Services/RawGApi";

//services
import {
  getGameRawGById,
  getStoreLinks,
  getScreenShotRawG,
} from "../Services/RawGApi";

// components
import GameDetailInfo from "../components/GameDetail/GameDetailInfo";
import GameDetailMedia from "../components/GameDetail/GameDetailMedia";

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------- fetch game details -----------------
  const [gameData, setGameData] = useState<GameRawGGeneral | null>(null);

  const fetchGameById = async (gameID: string) => {
    try {
      const gameData = await getGameRawGById(gameID);
      if (gameData === undefined || gameData.detail === "Not found.") {
        return null;
      }
      setGameData(gameData);

      return gameData;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  // ----------------- fetch game store link -----------------
  const [gameStoreLinks, setGameStoreLinks] = useState<GameStoreLink[] | null>(
    null,
  );

  const fetchGameStoreLink = async (gameId: string) => {
    try {
      const GameStoreLink = await getStoreLinks(gameId);
      if (GameStoreLink === undefined || GameStoreLink.length === 0) {
        return null;
      }
      setGameStoreLinks(GameStoreLink.results);

      return GameStoreLink.results;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  // -------------- fetch game screenshots ------------------
  const [gameScreenShots, setGameScreenShots] = useState<
    GameScreenShotRawG[] | null
  >();

  const fetchGameScreenShots = async (gameId: string) => {
    try {
      const gameScreenShots = await getScreenShotRawG(gameId);
      if (gameScreenShots === undefined || gameScreenShots.length === 0) {
        return null;
      }
      let screenshotList: GameScreenShotRawG[] = [];
      for (let i = 0; i < gameScreenShots.results.length; i++) {
        if (gameScreenShots.results[i].image !== null) {
          screenshotList.push(gameScreenShots.results[i]);
        }
      }
      setGameScreenShots(screenshotList);
      // console.log(screenshotList);
      return screenshotList;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  // ----------------------- fetching --------------------------
  useEffect(() => {
    // console.log(gameId, gameId === undefined);
    if (gameId === undefined) return;
    fetchGameById(gameId);
    fetchGameStoreLink(gameId);
    fetchGameScreenShots(gameId);
  }, []);

  // ----------------------- slider --------------------------
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  return (
    <div className={`relative min-h-screen bg-[#221200]`}>
      <div className="absolute left-0 top-0 w-full">
        <div className="relative w-full">
          <img
            className="relative w-full"
            src={gameData?.background_image}
            alt="background image"
          />
          <div className="gameDetail_background-desktop absolute left-0 top-0 h-full w-full"></div>
        </div>
      </div>

      <div className="relative h-full w-full">
        <div className="relative h-20 w-full">Header Later</div>
        <div className="flex flex-row">
          <GameDetailInfo gameData={gameData} gameStoreLinks={gameStoreLinks} />
          <GameDetailMedia />
        </div>

        {/* display list of screenshots */}
        {/* <div className="flex flex-row flex-wrap"> */}
        {/* {gameScreenShots?.map((screenshot, index) => {
            return (
              <div key={index} className="relative w-full md:w-1/2 lg:w-1/2 ">
                <img
                  loading="lazy"
                  className="w-full"
                  src={screenshot.image}
                  alt="screenshot"
                />
              </div>
            );
          })}
        </div> */}

        {gameScreenShots?.length != undefined && gameScreenShots?.length > 0 ? (
          <div ref={sliderRef} className="keen-slider">
            {gameScreenShots?.map((screenshot, index) => {
              return (
                <div
                  key={index}
                  className="keen-slider__slide relative  "
                >
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={screenshot.image}
                    alt="screenshot"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GameDetail;
