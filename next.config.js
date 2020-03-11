require('dotenv').config();
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, _) => {
  const baseConfig = {
    API_MOVIE_APP_KEY: '1a37d0e5b2a2a3ea229787a7101dc847',
    API_MOVIE_URL: `api.themoviedb.org/3`,
    API_TMBD_URL: 'https://image.tmdb.org/t/p'
  };
  let env;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    env = {
      ...baseConfig,
      API_URL:'http://localhost:3000'
    };
  } else {
    env = {
      ...baseConfig,
      API_URL:'https://react-movies.jero786.now.sh'
    };
  }

  return {
    env
  };
};
