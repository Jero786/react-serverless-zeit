import get from 'lodash/get';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';

import {Movie} from '../../../../types';
import {NowResponse} from '@now/node';
import {
  hydrateMovieImageSrc,
  roundVoteAverage
} from '../../../utils';
import {
  API_MOVIE_APP_KEY,
  API_MOVIE_URL
} from '../../../../env';

const axios = require('axios').default;

export default async (_, res: NowResponse) => {
  try {

    const response = await axios.get(`https://${API_MOVIE_URL}/discover/movie?api_key=${API_MOVIE_APP_KEY}`);
    const movies = get(response, 'data.results', []);
    const result = flow(
      map((movie: Movie) => hydrateMovieImageSrc(movie)),
      map((movie: Movie) => roundVoteAverage(movie))
    )(movies);
    res.json(result);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
