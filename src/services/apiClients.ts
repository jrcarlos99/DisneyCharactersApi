import axios from "axios";
import type { DisneyApiResponse } from "@/types/disney";

const BASE_URL = "https://api.disneyapi.dev/character";

export const getDisneyCharacters = async (
  page: number = 1
): Promise<DisneyApiResponse> => {
  try {
    const res = await axios.get<DisneyApiResponse>(`${BASE_URL}?page=${page}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar personagens:", err);
    throw err;
  }
};
