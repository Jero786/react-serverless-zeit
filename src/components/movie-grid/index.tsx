import { Movie } from '../../../types';
import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import Link from 'next/link';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import InfoIcon from '@material-ui/icons/Info';

interface MovieGridProps {
  movie: Movie
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movie }) => {
  return (
    <GridListTile data-testid='movie-list-item' key={movie.id}>
      <Link key={`link-a-${movie.id}`}
        href='/movie-detail/[slug]'
        as={`/movie-detail/${movie.id}`}>
        <img src={movie.poster_path} alt={movie.title} />
      </Link>
      <Link key={`link-b-${movie.id}`}
        href='/movie-detail/[slug]'
        as={`/movie-detail/${movie.id}`}>
        <GridListTileBar
          title={movie.title}
          subtitle={
            <>
              <div>Release date: {movie.release_date}</div>
              <Rating
                data-testid='movie-list-item__rating'
                name='simple-controlled'
                defaultValue={movie.vote_average_ui}
                precision={0.5}
                readOnly
                size='small'
              />
            </>
          }
          actionIcon={
            <IconButton aria-label={`info about ${movie.title}`}>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title={movie.overview}
              >
                <InfoIcon />
              </Tooltip>
            </IconButton>
          }
        />
      </Link>
    </GridListTile>
  );
};
