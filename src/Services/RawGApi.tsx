import axios from "axios";
const apiKey = "acfae1e51f0540c5b9c7bb4211faf13f";

export const rawGApi = axios.create({
  baseURL: "https://api.rawg.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//async await
export const getGameRawGById = async (gameId: string) => {
  const response = await rawGApi.get(`/games/${gameId}?key=${apiKey}`);
  return response.data;
};

export const getPopularGame = async () => {
  const response = await rawGApi.get(`/games?key=${apiKey}`);
  return response.data;
};

// Next time, try to add more specific parameters to the function, instead of separating getGameBySearch() and getGameBySearchAndPage()
// You can just make 1 with specific parameters, and then use the parameters to make the request

export const getGameBySearchAndPage = async (search: string, page: number) => {
  const response = await rawGApi.get(
    `/games?key=${apiKey}&search=${search}&page_size=12&page=${page}`,
  );
  return response.data;
};

export const getGamesByGenreAndPage = async (genre: string, page: number) => {
  const response = await rawGApi.get(
    `/games?key=${apiKey}&genres=${genre}&page_size=12&page=${page}`,
  );
  return response.data;
};

export const getGenres = async () => {
  const response = await rawGApi.get(`/genres?key=${apiKey}`);
  return response.data;
};

export interface GameRawGGeneral {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number | null;
  metacritic_platforms: any[]; // Replace 'any[]' with the actual type if available
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: {
      id: number;
      title: string;
      count: number;
      percent: number;
  }[];
  reactions: any; // Replace 'any' with the actual type if available
  added: number;
  added_by_status: {
      [key: string]: number;
  };
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: any; // Replace 'any' with the actual type if available
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: {
      platform: {
          id: number;
          name: string;
          slug: string;
          image: string | null;
          year_end: number | null;
          year_start: number | null;
          games_count: number;
          image_background: string;
      };
  }[];
  platforms: {
      platform: {
          id: number;
          name: string;
          slug: string;
          image: string | null;
          year_end: number | null;
          year_start: number | null;
          games_count: number;
          image_background: string;
      };
      released_at: string;
      requirements: {
          minimum: string;
      };
  }[];
  stores: {
      id: number;
      url: string;
      store: {
          id: number;
          name: string;
          slug: string;
          domain: string;
          games_count: number;
          image_background: string;
      };
  }[];
  developers: {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
  }[];
  genres: {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
  }[];
  tags: {
      id: number;
      name: string;
      slug: string;
      language: string;
      games_count: number;
      image_background: string;
  }[];
  publishers: {
      id: number;
      name: string;
      slug: string;
      games_count: number;
      image_background: string;
  }[];
  esrb_rating: any; // Replace 'any' with the actual type if available
  clip: any; // Replace 'any' with the actual type if available
  description_raw: string;
}