export interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
}

export interface DisneyApiResponse {
  info: {
    count: number;
    totalPages: number;
    previousPage: string | null;
    nextPage: string | null;
  };
  data: DisneyCharacter[];
}
