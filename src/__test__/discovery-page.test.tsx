import React from 'react';
import movies from './mocks/movies.json';
import { render, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscoveryPage from '../pages';
import debounce from 'lodash/debounce';
import { getAllMovies, getMoviesBy } from '../utils/client-api';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));
jest.mock('../pages/api/movies');
jest.mock('../utils/client-api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
  });
});

afterAll(() => {
  console.error.mockRestore();
  debounce.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Discovery page', () => {
  describe('should display movies properly', () => {
    it('when rendered their title and release date', () => {
      const { getByText } = render(<DiscoveryPage movies={movies} />);

      expect(getByText(/Sonic the Hedgehog/i)).toBeInTheDocument();
      expect(getByText(/2020-02-12/i)).toBeInTheDocument();
      expect(getByText(/Parasite/i)).toBeInTheDocument();
      expect(getByText(/2019-05-30/i)).toBeInTheDocument();
    });

    it('when ordered by votes in desc order', () => {
      const { getAllByTestId } = render(<DiscoveryPage movies={movies} />);

      const ratingEl = getAllByTestId('movie-list-item');
      expect(ratingEl.length).toEqual(2);
      expect(getByLabelText(ratingEl[0], '5 Stars')).toBeInTheDocument();
      expect(getByLabelText(ratingEl[1], '4 Stars')).toBeInTheDocument();
    });

    it('when filtered by 4 starts', () => {
      const { getByTestId, getAllByTestId } = render(<DiscoveryPage
        movies={movies} />);
      const filterByVotes = getByTestId('filter-by-votes');
      const startFour = filterByVotes.querySelector('#simple-controlled-4');

      userEvent.click(startFour);

      const ratingEl = getAllByTestId('movie-list-item');
      expect(ratingEl.length).toEqual(1);
      expect(getByLabelText(ratingEl[0], '4 Stars')).toBeInTheDocument();
    });
  });

  describe('should filter movies properly', () => {
    it('when type name of the movie', async () => {
      const { getByTestId, getAllByTestId, getByText } = render(<DiscoveryPage
        movies={movies} />);
      const inputFilter = getByTestId('filter-by-text').querySelector('input');
      const filterText = 'Parasite';
      debounce.mockClear();
      getMoviesBy.mockImplementation(() => movies.filter(movie => movie.title === filterText));

      await userEvent.type(inputFilter, filterText);

      const ratingEl = getAllByTestId('movie-list-item');
      const movie = getByText(filterText);
      expect(ratingEl.length).toEqual(1);
      expect(movie).toBeInTheDocument();
    });

    it('when filter is empty', async () => {
      const { getByTestId, getAllByTestId } = render(<DiscoveryPage
        movies={movies} />);
      const inputFilter = getByTestId('filter-by-text').querySelector('input');
      const filterText = '';
      debounce.mockClear();
      getAllMovies.mockImplementation(() => movies);

      await userEvent.type(inputFilter, filterText);

      const ratingEl = getAllByTestId('movie-list-item');
      expect(ratingEl.length).toEqual(2);
    });
  });
});
