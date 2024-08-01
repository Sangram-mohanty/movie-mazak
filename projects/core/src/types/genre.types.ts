export enum GenreType {
  movie = 'movie',
  tv = 'tv'
}
export interface Genre {
  id: number;
  name: string;
}
export interface IGenre {
  genres: Genre[]
}
