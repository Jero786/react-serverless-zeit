import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import {getMoviesById} from '../../utils/client-api';
import {Movie} from '../../../types';
import {hydrateMovieWithRatingUI} from '../../../src/utils';
import useStyle from '../../styles/movie-detail.style';
import Rating from "@material-ui/lab/Rating";

interface Props {
  movie: Movie
}

const DetailPage = ({movie}: Props) => {
  const classes = useStyle();
  return (
    <Container className={classes.root} maxWidth="md">
      <Box className={classes.header}>
        <Paper className={classes.breadcrumb}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Typography color="textPrimary">{movie.title}</Typography>
          </Breadcrumbs>
        </Paper>
      </Box>
      <Box className={classes.body} component="figure">
        <h1>{movie.title}</h1>
        <Box className={classes.movieBox}>
          <img className={classes.poster} src={movie.poster_path}
               alt={movie.title}/>
          <Typography className={classes.overview}
                      component="figcaption">{movie.overview}</Typography>
        </Box>
        <Box paddingTop="1em">
          <Typography component="legend">Votes</Typography>
          <Rating
            value={movie.vote_average_ui}
            readOnly
          />
        </Box>
      </Box>
    </Container>
  );
};

DetailPage.getInitialProps = async ({query}) => {
  const movie = await getMoviesById(query.slug);
  return {movie: hydrateMovieWithRatingUI(movie)};
};


export default DetailPage;

