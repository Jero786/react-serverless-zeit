import {Movie} from '../../types';
import fetch from 'isomorphic-unfetch';

import {API_URL} from '../../env';

export async function getAllMovies(): Promise<Movie[]> {
  const url = `${API_URL}/api/movies`;
  const response = await fetch(url);
  return await response.json();
}

export async function getMoviesBy(query): Promise<Movie[]> {
  const url = `${API_URL}/api/movies/search?query="${query}"`;
  const response = await fetch(url);
  return response.json();
}

export async function getMoviesById(slug): Promise<Movie> {
  const url = `${API_URL}/api/movies/${slug}`;
  const response = await fetch(url);
  return response.json();
}

