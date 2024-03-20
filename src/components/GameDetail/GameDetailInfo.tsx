
import { GameRawGGeneral } from "../../Services/RawGApi";

interface GameDetailInfoProps {
  gameData: GameRawGGeneral | null;
}

const GameDetailInfo = ({ gameData }: GameDetailInfoProps) => {
  return (
    <div className="flex-grow">
      {/* <div>Pagination</div> */}
      <div className="flex gap-3 py-1">
        <div className="flex items-center justify-center rounded-md bg-orange text-sm font-semibold text-black lg:px-3">
          {gameData?.released}
        </div>
        {/* <div className=' text-orange px-3'>{gameData?.ratings_count} Ratings</div> */}
        <div className="font-body">
          AVERAGE PLAYTIME: {gameData?.playtime} HOURS
        </div>
      </div>
      <div className="font-bold lg:text-6xl">{gameData?.name}</div>

      <div>
        
      </div>
    </div>
  );
};

export default GameDetailInfo;
