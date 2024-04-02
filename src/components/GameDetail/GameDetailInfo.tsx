import { GameRawGGeneral, GameStoreLink } from "../../Services/RawGApi";
import {
  FaSteam,
  FaXbox,
  FaPlaystation,
  FaApple,
  FaGooglePlay,
  FaItchIo,
} from "react-icons/fa";
import { SiGogdotcom, SiNintendoswitch, SiEpicgames } from "react-icons/si";

interface GameDetailInfoProps {
  gameData: GameRawGGeneral | null;
  gameStoreLinks: GameStoreLink[] | null;
}

const GameDetailInfo = ({ gameData, gameStoreLinks }: GameDetailInfoProps) => {
  return (
    <div className="flex-grow">
      {/* <div>Pagination</div> */}
      <div className="flex gap-3 py-1">
        <div className="flex items-center justify-center rounded-md bg-black px-1 text-sm font-semibold text-white lg:px-3 text-nowrap">
          {gameData?.released}
        </div>
        <ul className="flex items-center ">
          {gameStoreLinks?.map((store, index) => (
            <li className="mx-1 my-2" key={index}>
              {Number(store.store_id) === 1 ? <FaSteam /> : ""}
              {Number(store.store_id) === 2 ? <FaXbox /> : ""}
              {Number(store.store_id) === 3 ? <FaPlaystation /> : ""}
              {Number(store.store_id) === 4 ? <FaApple /> : ""}
              {Number(store.store_id) === 5 ? <SiGogdotcom /> : ""}
              {Number(store.store_id) === 6 ? <SiNintendoswitch /> : ""}
              {/* {Number(store.store_id) === 7 ? "360" : ""} */}
              {Number(store.store_id) === 8 ? <FaGooglePlay /> : ""}
              {Number(store.store_id) === 9 ? <FaItchIo /> : ""}
              {Number(store.store_id) === 11 ? <SiEpicgames /> : ""}
            </li>
          ))}
        </ul>
        <div className="flex items-center font-body text-nowrap">
          AVERAGE PLAYTIME: <span className="text-orange font-semibold"> {gameData?.playtime} HOURS</span> 
        </div>
      </div>
      <div className="font-bold text-5xl lg:text-6xl my-5">{gameData?.name}</div>

      <div className="my-3">
        <h1 className="text-2xl text-orange underline ">Genres: </h1>
        {gameData?.genres.map((genre, index) => (
          <span className="text-xl font-semibold hover:text-blue-400" key={index}>
            {genre.name}
            {index < gameData.genres.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      <div className="w-fit my-3">
        <h1 className="text-2xl text-orange underline ">Store List:</h1>
        <ul className="flex rounded-md ">
          {gameStoreLinks?.map((store, index) => (
            <li className="mx-1 my-2 rounded-md bg-orangeCard p-1 hover:bg-blue-400" key={index}>
              <a
                className="flex justify-center"
                href={store.url}
                target="_blank"
                rel="noreferrer"
              >
                {Number(store.store_id) === 1 ? "Steam" : ""}
                {Number(store.store_id) === 2 ? "Xbox Store" : ""}
                {Number(store.store_id) === 3 ? "PlayStation Store" : ""}
                {Number(store.store_id) === 4 ? "App Store" : ""}
                {Number(store.store_id) === 5 ? "GOG" : ""}
                {Number(store.store_id) === 6 ? "Nintendo" : ""}
                {Number(store.store_id) === 7 ? "Xbox 360" : ""}
                {Number(store.store_id) === 8 ? "Google Play" : ""}
                {Number(store.store_id) === 9 ? "itch.io" : ""}
                {Number(store.store_id) === 11 ? "Epic Games" : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-2xl text-orange underline ">Description:</h1>
        <p className="first-letter:text-3xl font-bold">{gameData?.description_raw}</p>
      </div>
    </div>
  );
};

export default GameDetailInfo;
