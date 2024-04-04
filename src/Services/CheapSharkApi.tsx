import axios from "axios";

export const rawGApi = axios.create({
  baseURL: "https://www.cheapshark.com/api/1.0",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPriceListByName = async (gameTitle: string) => {
  const response = await rawGApi.get(`/games?title=${gameTitle}`);
  return response.data;
};

export const getExactGameByName = async (gameTitle: string) => {
  const response = await rawGApi.get(`/games?title=${gameTitle}&exact=1`);
  return response.data;
};

export const getStoresInfo = async () => {
  const response = await rawGApi.get(`/stores`);
  return response.data;
};

export const getGameById = async (gameId: number) => {
  const response = await rawGApi.get(`/games?id=${gameId}`);
  return response.data;
};

export interface GameCardCheapSharkOverview {
  gameID: number;
  steamAppID: number;
  cheapest: number;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}

// export interface GameCheapSharkDetails {
//   info: {
//     title: string;
//     steamAppID: string;
//     thumb: string;
//   };
//   cheapestPriceEver: {
//     price: string;
//     date: number;
//   };
//   deals: {
//     storeID: string;
//     dealID: string;
//     price: string;
//     retailPrice: number;
//     savings: number;
//   }[];
// }