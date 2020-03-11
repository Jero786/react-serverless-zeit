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
  API_MOVIE_URL,
  API_MOVIE_APP_KEY
} from '../../../../env';

const axios = require('axios').default;

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const query = req.query.query;
    const response = await axios.get(`https://${API_MOVIE_URL}/search/movie?api_key=${API_MOVIE_APP_KEY}&query=${query}`);
    const movies = get(response, 'data.results');
    return res.json(flow(
      map((movie: Movie) => hydrateWithBaseAndSizeImage(movie, 'poster_path')),
      map((movie: Movie) => roundVoteAverage(movie))
    )(movies));
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
