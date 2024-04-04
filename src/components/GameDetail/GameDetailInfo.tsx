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

const storeIcons: { [key: number]: JSX.Element } = {
  1: <FaSteam />,
  2: <FaXbox />,
  3: <FaPlaystation />,
  4: <FaApple />,
  5: <SiGogdotcom />,
  6: <SiNintendoswitch />,
  // 7: "360",
  8: <FaGooglePlay />,
  9: <FaItchIo />,
  11: <SiEpicgames />,
};

const GameDetailInfo = ({ gameData, gameStoreLinks }: GameDetailInfoProps) => {
  return (
    <div className="flex-grow">
      {/* <div>Pagination</div> */}
      <div className="flex gap-3 py-1">
        <div className="flex items-center justify-center text-nowrap rounded-md bg-black px-1 text-sm font-semibold text-white lg:px-3">
          {gameData?.released}
        </div>
        <ul className="flex items-center ">
          {gameStoreLinks?.map((store, index) => (
            <li className="mx-1 my-2" key={index}>
              {storeIcons[Number(store.store_id)]}
            </li>
          ))}
        </ul>
        <div className="flex items-center text-nowrap font-body">
          AVERAGE PLAYTIME:{" "}
          <span className="font-semibold text-orange">
            {" "}
            {gameData?.playtime} HOURS
          </span>
        </div>
      </div>
      <div className="my-5 text-5xl font-bold lg:text-6xl">
        {gameData?.name}
      </div>

      <div className="my-3">
        <h1 className="text-2xl text-orange underline ">Genres: </h1>
        {gameData?.genres.map((genre, index) => (
          <span
            className="text-xl font-semibold hover:text-blue-400"
            key={index}
          >
            {genre.name}
            {index < gameData.genres.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      <div className="my-3 w-fit">
        <h1 className="text-2xl text-orange underline ">Store List:</h1>
        <ul className="flex rounded-md flex-wrap">
          {gameStoreLinks?.map((store, index) => (
            <li
              className="mx-1 my-2 rounded-md bg-orangeCard p-1 hover:bg-blue-400"
              key={index}
            >
              <a
                className="flex justify-center text-nowrap"
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
        <p className="font-bold first-letter:text-3xl">
          {gameData?.description_raw}
        </p>
      </div>
    </div>
  );
};

export default GameDetailInfo;
