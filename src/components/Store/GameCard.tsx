import { Game } from "./StoreMain";
import "../../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";

function GameCard(game: Game) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
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
  );
}

export default GameCard;
