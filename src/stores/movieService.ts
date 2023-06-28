import axios from "axios";
import { defineStore } from "pinia";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY

function api() {
  return axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL
  })
}

function topRated() {
  return api().get('top_rated?api_key=' + apiKey)
}

type Item = {
  backdrop_path: string;
  title: string;
  user: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Item[]
  }),
  actions: {
    getTopRatedMovies() {
      topRated()
        .then((movies) => {
          if (movies.data) {
            const mapMovieData = movies.data.results.map((movie: Item) => {
              const userName = movie.title.replace(/['\.,?!: ]/g,'')
              movie.user = '@' + userName;
              return movie;
            });
            this.movies = mapMovieData
          }
        })
        .catch(e => console.log("errör", e))
    }
  },
  getters: {}
})