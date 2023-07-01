import axios from "axios";
import { defineStore } from "pinia";
import {v4 as uuidv4} from 'uuid'
import { differenceInSeconds, differenceInHours, isSameYear, format, formatDistance } from 'date-fns'

const apiKey = import.meta.env.VITE_MOVIE_API_KEY

function api() {
  return axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL
  })
}

function topRated() {
  return api().get('top_rated?api_key=' + apiKey)
}

export function handleUsername (val: string) {
  return '@' + val.replace(/['\.,?!: ]/g,'')
}

export function handleDateFormat (val: string) {
  console.log("val", val);
  
  const date = new Date()
  const dataDate = new Date(val)
  const secondsDifference = differenceInSeconds(date, dataDate)
  const hoursDifference = differenceInHours(date, dataDate)
  const checkYear = isSameYear(date, dataDate)
  
  const dateFormat = formatDistance(dataDate, date)

  // let dateFormat = '';

  // if (secondsDifference < 60) {
  //   dateFormat = 'Now';
  //   // console.log('Now');
    
  // } else if (hoursDifference < 1) {
  //   dateFormat = format(dataDate, "m 'm'");
  //   // console.log('hoursDifference', hoursDifference);
  //   // console.log('date', date);
  //   // console.log('dataDate', dataDate);

  // } else if (hoursDifference > 1 && hoursDifference < 24) {
  //   dateFormat = format(dataDate, "H 'h'");
  //   // console.log('h', dateFormat);

  // } else if (checkYear) {
  //   dateFormat = format(dataDate, 'MMM i');
  //   // console.log('MMM i', dateFormat);

  // } else {
  //   dateFormat = format(dataDate, 'PP');
  //   // console.log('PP', dateFormat);

  // }

  return dateFormat
}

function designData (data: any) {
  const movieData = 
    data
      .sort((objA: Item, objB: Item) => new Date(objB.release_date).valueOf() - new Date(objA.release_date).valueOf())
      .map((movie: Item) => {
        movie.id = uuidv4();
        movie.user = handleUsername(movie.title)
        // movie.release_date = handleDateFormat(movie.release_date);
        
        return movie;
      })
  
  return movieData;
}

export type Item = {
  id: string;
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
            this.movies = designData(movies.data.results)
          }
        })
        .catch(e => console.log("errör", e))
    }
  },
  getters: {}
})