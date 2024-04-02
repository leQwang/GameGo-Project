import { useEffect, useState } from "react";
// import parse from "html-react-parser";

import { useParams } from "react-router-dom";

//interface
import { GameRawGGeneral, GameStoreLink } from "../Services/RawGApi";

//services
import { getGameRawGById, getStoreLinks } from "../Services/RawGApi";

// components
import GameDetailInfo from "../components/GameDetail/GameDetailInfo";
import GameDetailMedia from "../components/GameDetail/GameDetailMedia";

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  console.log(gameId);

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
  const [gameStoreLinks, setGameStoreLinks] = useState<GameStoreLink[] | null>(null);

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
  }

  // -------------------------------------------------
  useEffect(() => {
    console.log(gameId, gameId === undefined);
    if (gameId === undefined) return;
    fetchGameById(gameId);
    fetchGameStoreLink(gameId);
  }, []);
    

  return (
    <div className={`relative h-screen bg-[#221200]`}>
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
      </div>
    </div>
  );
}

export default GameDetail;
