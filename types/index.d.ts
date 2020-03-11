/* eslint camelcase: 0 */
export interface Movie {
  id: string,
  title: string,
  icon: string,
  poster_path: string,
  vote_average: number,
  vote_average_ui?: number,
  backdrop_path: string
  overview: string,
  release_date: string,
}
