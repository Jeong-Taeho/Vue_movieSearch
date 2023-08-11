import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

export type Movies = Movie[];

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type MoviesResponse = {
  Search: Movies;
  totalResults: string;
  Response: string;
};

export interface MoviesStoreState {
  movies: Movies;
  isLoading: boolean;
  totalResults: number;
}

export const useMoviesStore = defineStore("movies", {
  state: (): MoviesStoreState => ({
    movies: [],
    isLoading: false,
    totalResults: 0
  }),
  actions: {
    async fetchMovies({
      title,
      year,
      page = 1
    }: {
      title: string;
      year?: string;
      page?: number;
    }) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const { data: moviesData }: AxiosResponse<MoviesResponse> =
          await axios.get("/api/movie", {
            params: { s: title, year, page }
          });
        this.movies = moviesData.Search;
        this.totalResults = Number(moviesData.totalResults);
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
