import React from "react";
import { Game } from "./HomeMain";
import "../../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function GameCard(game: Game) {
  return (
    <li
      key={game.id}
      className="bg-gamecard xl:h-92 group relative flex w-full flex-col overflow-hidden rounded-xl transition-all duration-100 ease-in-out hover:z-10 hover:scale-105 hover:overflow-visible hover:bg-orangeCard hover:shadow-lg hover:rounded-t-xl md:hover:rounded-b-none"
    >
      <LazyLoadImage
        src={game.background_image}
        alt={game.name}
        className="h-40 w-full object-cover overflow-hidden rounded-t-xl"
        effect="blur"
      />
      <div className="flex flex-grow flex-col px-2">
        <div className="flex-grow text-xl xl:text-3xl">{game.name}</div>
        <p className="mt-auto">Rating⭐: {game.rating}</p>
        <div className="relative md:absolute md:top-[100%] left-0 w-full md:bg-orangeCard md:opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 md:px-2 pb-2 md:rounded-b-xl">
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
        {/* <div className="relative left-0 w-full transition-opacity duration-200 ease-in-out group-hover:opacity-100 pb-2 rounded-b-xl">
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
        </div> */}
      </div>
    </li>
  );
}

export default GameCard;
