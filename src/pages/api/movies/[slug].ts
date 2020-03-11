import get from 'lodash/get';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';

import {Movie} from '../../../../types';
import {NowResponse, NowRequest} from '@now/node';
import {
  hydrateWithBaseAndSizeImage,
  roundVoteAverage
} from '../../../utils';
import {
  API_MOVIE_APP_KEY,
  API_MOVIE_URL
} from '../../../../env';

const axios = require('axios').default;

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const movieId = req.query.slug;
    const response = await axios.get(`https://${API_MOVIE_URL}/movie/${movieId}?api_key=${API_MOVIE_APP_KEY}`);
    const movies = [get(response, 'data')];
    const result = flow(
      map((movie: Movie) => hydrateWithBaseAndSizeImage(movie, 'poster_path')),
      map((movie: Movie) => hydrateWithBaseAndSizeImage(movie, 'backdrop_path')),
      map((movie) => roundVoteAverage(movie))
    )(movies)[0];
    res.json(result);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
