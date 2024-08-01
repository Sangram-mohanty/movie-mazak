import { genreState } from '../states';
import { createSelector } from '@ngrx/store';
import { Genre } from '../../../types/genre.types';
import { Selectors } from '../selectors';

export const selectGenre = (state: Selectors) => state['genre'];
export const selectGenreMovie = createSelector(selectGenre, ({ movie }: genreState) => movie);
export const selectGenreTv = createSelector(selectGenre, ({ tv }: genreState) => tv);
export const selectGenreMovieById = (genreId: number) => createSelector(selectGenreMovie, (genres: Genre[],) => genres.find(({ id }) => id === genreId));
export const selectGenreTvById = (genreId: number) => createSelector(selectGenreTv, (genres: Genre[]) => genres.find(({ id }) => id === genreId));
