import axios from "axios";
const apiKey = "acfae1e51f0540c5b9c7bb4211faf13f";

export const rawGApi = axios.create({
  baseURL: "https://api.rawg.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//async await
export const getGameById = async (gameId: string) => {
  const response = await rawGApi.get(`/games/${gameId}?key=${apiKey}`);
  return response.data;
};

export const getPopularGame = async () => {
  const response = await rawGApi.get(`/games?key=${apiKey}`);
  return response.data;
};

export const getGameBySearch = async (search: string) => {
  const response = await rawGApi.get(`/games?key=${apiKey}&search=${search}`);
  return response.data;
};

export const getGamesByGenre = async (genre: string) => {
  const response = await rawGApi.get(`/games?key=${apiKey}&genres=${genre}&page_size=12&page=1`);
  return response.data;
};

export const getGenres = async () => {
  const response = await rawGApi.get(`/genres?key=${apiKey}`);
  return response.data;
};
