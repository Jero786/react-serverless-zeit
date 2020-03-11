import React, {
  useState,
  useRef
} from 'react';
import isEmpty from 'lodash/isEmpty';

import GridList from '@material-ui/core/GridList';
import InputAdornment from '@material-ui/core/InputAdornment';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { MovieGrid } from '../../src/components/movie-grid';
import { getAllMovies } from '../../src/utils/client-api';
import { hydrateMoviesWithRatingUI, sortByVoteAverage } from '../../src/utils';
import { useOnSearchMovieBy } from '../../src/hooks/useOnSearchMovieBy';
import useStyles from '../styles/discovery-page.style';
import { Movie } from 'types';

const EMPTY_MOVIE_LIST = [];

interface DiscoveryPageProps {
  movies: Movie[]
}

const DiscoveryPage = ({ movies = EMPTY_MOVIE_LIST }: DiscoveryPageProps) => {
  const classes = useStyles();
  const searchInputEl = useRef<HTMLInputElement>();
  const [popularityFilter, setPopularityFilter] = useState<number>(-1);
  const [resultSearchMovies, setResultSearchMovies] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onSearchMovieBy = useOnSearchMovieBy({
    setResultSearchMovies,
    searchInputEl,
    setIsSearching
  });
  const moviesHydrated = hydrateMoviesWithRatingUI(movies);
  const resultSearchMoviesHydrated = hydrateMoviesWithRatingUI(resultSearchMovies);
  const displayMovies = filterMoviesByVoteAverage({
    resultSearchMoviesHydrated,
    moviesHydrated,
    popularityFilter
  });

  return (
    <section className={classes.root}>
      <Container maxWidth='md'>
        <Box className={classes.header}
          component='fieldset' mb={3}
          borderColor='transparent'>
          <Box mt={2}>
            <TextField
              data-testid='filter-by-text'
              ref={searchInputEl}
              onChange={onSearchMovieBy}
              className={classes.inputSearch}
              id='input-with-icon-textfield'
              label='Search movie'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {<SearchIcon />}
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography component='legend'>Filter by Votes</Typography>
            <Rating
              data-testid='filter-by-votes'
              name='simple-controlled'
              value={popularityFilter}
              onChange={(_, ratingValue) => {
                if (ratingValue) {
                  setPopularityFilter(ratingValue);
                } else {
                  setPopularityFilter(-1);
                }
              }}
            />
          </Box>
        </Box>

        <Box className={classes.body}
          data-testid='movie-list'
          component='fieldset'
          borderColor='transparent'>
          <GridList cellHeight={280} className={classes.gridList}>
            <GridListTile key='Subheader' cols={3} style={{ height: 'auto' }}>
              {isSearching ? <LinearProgress /> : null}
            </GridListTile>
            {
              sortByVoteAverage(displayMovies).map(movie => MovieGrid({ movie }))
            }
          </GridList>
        </Box>
      </Container>
    </section>
  );
};

interface FilterAndSortProps {
  resultSearchMoviesHydrated: Movie[],
  moviesHydrated: Movie[],
  popularityFilter: number
}

const RATING_VALUE = {
  1: [0, 1, 2],
  2: [2, 3, 4],
  3: [4, 5, 6],
  4: [6, 7, 8],
  5: [8, 9, 10]
};

function filterMoviesByVoteAverage ({
  resultSearchMoviesHydrated = [],
  moviesHydrated = [],
  popularityFilter
}: FilterAndSortProps): Movie[] {
  let displayMovies;

  if (isEmpty(resultSearchMoviesHydrated)) {
    displayMovies = moviesHydrated;
  } else {
    displayMovies = resultSearchMoviesHydrated;
  }

  if (popularityFilter > -1) {
    displayMovies = displayMovies.filter((movie) => RATING_VALUE[popularityFilter].includes(movie.vote_average));
  }

  return displayMovies;
}

DiscoveryPage.getInitialProps = async (): Promise<{ movies: Movie[] }> => {
  const movies = await getAllMovies();
  return { movies };
};

export default DiscoveryPage;
