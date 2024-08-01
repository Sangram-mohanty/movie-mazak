import { ResolveFn } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { Genre, GenreType } from '../../types/genre.types';
import { catchError, map, of } from 'rxjs';
abstract class BaseGenreResolver {
  public static readonly getGenreList = (
    genreType: GenreType,
    genreService = new GenreService()
  ) =>
    genreService.getGenreList(genreType).pipe(
      map(({ genres }) => genres),
      catchError((err) => {
        console.error(err);
        return of([] satisfies Genre[]);
      })
    );
}
export const movieResolver: ResolveFn<Genre[]> = () =>
  BaseGenreResolver.getGenreList(GenreType.movie);
export const tvResolver: ResolveFn<Genre[]> = () =>
  BaseGenreResolver.getGenreList(GenreType.tv);
