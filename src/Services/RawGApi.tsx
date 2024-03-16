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

// Next time, try to add more specific parameters to the function, instead of separating getGameBySearch() and getGameBySearchAndPage()
// You can just make 1 with specific parameters, and then use the parameters to make the request

export const getGameBySearchAndPage = async (search: string, page: number) => {
  const response = await rawGApi.get(
    `/games?key=${apiKey}&search=${search}&page_size=4&page=${page}`,
  );
  return response.data;
};

export const getGamesByGenreAndPage = async (genre: string, page: number) => {
  const response = await rawGApi.get(
    `/games?key=${apiKey}&genres=${genre}&page_size=4&page=${page}`,
  );
  return response.data;
};

export const getGenres = async () => {
  const response = await rawGApi.get(`/genres?key=${apiKey}`);
  return response.data;
};
