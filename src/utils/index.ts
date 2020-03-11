import {Movie} from 'types';
import orderBy from 'lodash/orderBy';

import {
  API_TMBD_URL,
  DEFAULT_SIZE
} from "../../env";


export function sortByVoteAverage(movies: Movie[]): Movie[] {
  return orderBy(movies, ['vote_average'], ['desc']);
}

type MovieImageField = 'poster_path' | 'backdrop_path'

export function hydrateWithBaseAndSizeImage(movie: Movie, movieField: MovieImageField, size = DEFAULT_SIZE): Movie {
  return {
    ...movie,
    [movieField]: `${API_TMBD_URL}${size}${movie[movieField]}`
  };
}

export function hydrateMovieImageSrc(movie: Movie): Movie {
  return {
    ...movie,
    ['backdrop_path']: `${API_TMBD_URL}${DEFAULT_SIZE}${movie['backdrop_path']}`,
    ['poster_path']: `${API_TMBD_URL}${DEFAULT_SIZE}${movie['poster_path']}`
  };
}

export function roundVoteAverage(movie: Movie): Movie {
  return {
    ...movie,
    ['vote_average']: Math.round(movie['vote_average'])
  };
}

export function hydrateMovieWithRatingUI(movie: Movie): Movie {
  return {
    ...movie,
    vote_average_ui: Math.round(movie.vote_average / 2)
  };
}

export function hydrateMoviesWithRatingUI(movies: Movie[]): Movie[] {
  return movies.map(hydrateMovieWithRatingUI);
}

