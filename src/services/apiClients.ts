import axios from "axios";
import type { DisneyApiResponse, DisneyCharacter } from "@/types/disney";

const BASE_URL = "https://api.disneyapi.dev/character";

export const getDisneyCharactersPaginated = async (
  page: number = 1
): Promise<DisneyApiResponse> => {
  try {
    const res = await axios.get<DisneyApiResponse>(`${BASE_URL}?page=${page}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar personagens da Disney:", error);
    throw error;
  }
};

export const searchDisneyCharactersByName = async (
  name: string
): Promise<DisneyCharacter[]> => {
  const formattedName = name.trim();
  if (!formattedName) {
    return [];
  }
  try {
    const res = await axios.get<DisneyApiResponse>(
      `${BASE_URL}?name=${formattedName}`
    );

    if (res.data && res.data.data) {
      return res.data.data;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar personagens da Disney:", error);
    return [];
  }
};
