import { GameRawGGeneral, GameStoreLink } from "../../Services/RawGApi";

interface GameDetailInfoProps {
  gameData: GameRawGGeneral | null;
  gameStoreLinks: GameStoreLink[] | null;
}

const GameDetailInfo = ({ gameData, gameStoreLinks }: GameDetailInfoProps) => {
  return (
    <div className="flex-grow">
      {/* <div>Pagination</div> */}
      <div className="flex gap-3 py-1">
        <div className="flex items-center justify-center rounded-md bg-orange px-1 text-sm font-semibold text-black lg:px-3">
          {gameData?.released}
        </div>
        {/* <div className=' text-orange px-3'>{gameData?.ratings_count} Ratings</div> */}
        <div className="font-body">
          AVERAGE PLAYTIME: {gameData?.playtime} HOURS
        </div>
      </div>
      <div className="font-bold lg:text-6xl">{gameData?.name}</div>

      <div>
        <h1 className="text-2xl text-orange underline ">Genres: </h1>
        {gameData?.genres.map((genre, index) => (
          <span key={index}>{genre.name}</span>
        ))}
      </div>

      <div className="w-fit">
        <h1 className="text-2xl text-orange underline ">Store List</h1>
        <div></div>
        <ul className="grid grid-cols-2 rounded-md ">
          {gameStoreLinks?.map((store, index) => (
            <li className="mx-1 my-2 rounded-md bg-orangeCard p-1" key={index}>
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
    </div>
  );
};

export default GameDetailInfo;
