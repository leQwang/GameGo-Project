import { useEffect, useState } from "react";
// import parse from "html-react-parser";

import { useParams } from "react-router-dom";

//interface
import { GameRawGGeneral } from "../Services/RawGApi";

//services
import { getGameRawGById } from "../Services/RawGApi";

// components
import GameDetailInfo from "../components/GameDetail/GameDetailInfo";
import GameDetailMedia from "../components/GameDetail/GameDetailMedia";

function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();

  const [gameData, setGameData] = useState<GameRawGGeneral | null>(null);

  const fetchGameById = async (gameID: string) => {
    try {
      const gameData = await getGameRawGById(gameID);
      console.log(gameData);
      if (gameData === undefined || gameData.detail === "Not found.") {
        return null;
      }
      setGameData(gameData);

      return gameData;
    } catch (error) {
      console.error("Error fetching gameList Overview details:", error);
    }
  };

  useEffect(() => {
    console.log(gameId, gameId === undefined);
    if (gameId === undefined) return;
    fetchGameById(gameId);
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
          <GameDetailInfo gameData={gameData} />
          <GameDetailMedia />
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
