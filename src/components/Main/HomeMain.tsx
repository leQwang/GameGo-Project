import React, { useEffect } from "react";
import { useSelectedGenre } from "../Provider/SelectedGenreProvider";
import { getGamesByGenre } from "../../Services/RawGApi";
import GameCard from "./GameCard";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  ratings_count: number;
  genres: {
    id: number;
    name: string;
  }[];
}

function HomeMain() {
  const { selectedGenre } = useSelectedGenre();
  const [gamesList, setGamesList] = React.useState<Game[]>([]);

  const getGamesByGenreFunc = async (genreId: number) => {
    const data = await getGamesByGenre(genreId.toString());

    const gamesListTemp: Game[] = data.results.map((result: Game) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      released: result.released,
      rating: result.rating,
      ratings_count: result.ratings_count,
      genres: result.genres,
    }));

    setGamesList(gamesListTemp);
    return gamesListTemp;
  };

  useEffect(() => {
    getGamesByGenreFunc(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="">
      <h1 className="text-6xl font-bold">Trending Games</h1>
      <h2 className="text-2xl font-bold mb-3">Based on review from thousands of players</h2>
      <div className="grid grid-cols-4 gap-3 my-3 mr-3">
        {gamesList.map((game, index) => {
          return <GameCard key={index} {...game} />;
        })}
      </div>
    </div>
  );
}

export default HomeMain;
