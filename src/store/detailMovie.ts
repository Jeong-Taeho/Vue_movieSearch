import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { Movie } from "./movies";

export interface DetailMovieResponse extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface MovieStoreState {
  isLoading: boolean;
  detailMovie: DetailMovieResponse | null;
}

export const useDetailMovieStore = defineStore("detailMovie", {
  state: (): MovieStoreState => ({
    isLoading: false,
    detailMovie: null
  }),
  actions: {
    async fetchDetailMovie({
      imdbID,
      plot
    }: {
      imdbID: string;
      plot?: "short" | "full";
    }) {
      try {
        if (this.isLoading) return;
        this.isLoading = true;
        const { data: detailMovieData }: AxiosResponse<DetailMovieResponse> =
          await axios.get("/api/movie", {
            params: { i: imdbID, plot }
          });
        this.detailMovie = detailMovieData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // axios 오류일 때
          console.error(`status : ${error.status} message : ${error.message}`);
        } else if (error instanceof Error) {
          // axios 오류가 아닐 때
          console.error(error.message);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
});
