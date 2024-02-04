import React from "react";
import { Game } from "./HomeMain";
import "../../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function GameCard(game: Game) {
  return (
    <li key={game.id} className="flex h-96 flex-col overflow-hidden rounded-md bg-gamecard">
      <LazyLoadImage
        src={game.background_image}
        alt={game.name}
        className="LazyLoad is-visible h-40 w-full object-cover"
        effect="blur"
      />
      <div>
        <h5>{game.name}</h5>
        <p>Released: {game.released}</p>
        <p>Rating: {game.rating}</p>
        <p>Ratings Count: {game.ratings_count}</p>
        <p>
          Genres:{" "}
          {game.genres.map((genre, index) => {
            return (
              <span key={index}>
                {index > 0 ? `, ${genre.name}` : genre.name}
              </span>
            );
          })}
        </p>
      </div>
    </li>
  );
}

export default GameCard;
