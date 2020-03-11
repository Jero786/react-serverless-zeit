import { Dispatch, DispatchWithoutAction, MutableRefObject } from 'react';
import { Movie } from '../../types';
import debounce from 'lodash/debounce';
import { getAllMovies, getMoviesBy } from '../utils/client-api';

interface useOnSearchMovieByProps {
  searchInputEl: MutableRefObject<HTMLInputElement>,
  setResultSearchMovies: Dispatch<Movie[]>
  setIsSearching: Dispatch<boolean>,
  waitBeforeSearch?: number
}

export function useOnSearchMovieBy ({
  searchInputEl = {current: document.createElement("input")},
  setResultSearchMovies,
  setIsSearching,
  waitBeforeSearch = 1000
}: useOnSearchMovieByProps): DispatchWithoutAction {
  return debounce(async () => {
    setIsSearching(true);

    const value = searchInputEl.current.querySelector('input').value;

    if (value) {
      const movies = await getMoviesBy(value);
      setResultSearchMovies(movies);
    } else {
      const movies = await getAllMovies();
      setResultSearchMovies(movies);
    }
    setIsSearching(false);
  }, waitBeforeSearch);
}
