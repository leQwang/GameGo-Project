import { useEffect, useState } from "react";
// import parse from "html-react-parser";

import { useParams } from "react-router-dom";

import "keen-slider/keen-slider.min.css";

//interface
import { GameRawGGeneral, GameStoreLink } from "../Services/RawGApi";

//services
import { getGameRawGById, getStoreLinks } from "../Services/RawGApi";

// components
import GameDetailInfo from "../components/GameDetail/GameDetailInfo";
import Footer from "../components/Footer/Footer";
import ScrShotCarousel from "../components/GameDetail/ScrShotCarousel";

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

  // ----------------------- fetching --------------------------
  useEffect(() => {
    // console.log(gameId, gameId === undefined);
    if (gameId === undefined) return;
    fetchGameById(gameId);
    fetchGameStoreLink(gameId);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-[#221200]`}>
      <div className="relative min-h-screen">
        <div className="absolute left-0 top-0 w-full">
          <div className="relative w-full">
            <img
              className="relative w-full"
              src={gameData?.background_image}
              alt="background image"
              // loading="lazy"
            />
            <div className="gameDetail_background-desktop absolute left-0 top-0 h-full w-full"></div>
          </div>
        </div>
        {/* ------------------------------------------ */}
        <div className="relative mx-1">
          <div className="relative h-full w-full">
            <div className="relative h-20 w-full"></div>
            <div className="mx-auto flex w-full flex-row md:w-1/2">
              <GameDetailInfo
                gameData={gameData}
                gameStoreLinks={gameStoreLinks}
              />
              {/* <GameDetailMedia /> */}
            </div>
          </div>
        </div>
        {gameId === undefined ? "" : <ScrShotCarousel gameId={gameId.toString()} />}

      </div>
      <Footer />
    </div>
  );
}

export default GameDetail;
