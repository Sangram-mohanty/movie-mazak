import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectGenreMovie,
  selectGenreMovieById,
  selectGenreTvById,
} from '../../store/genre/selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Selectors } from '../../store/selectors';
import { updateMovie, updateTv } from '../../store/genre/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #store = inject(Store<Selectors>);
  readonly #genreTvById$ = (id: number) =>
    this.#store.select(selectGenreTvById(id));
  readonly #genreMovieById$ = (id: number) =>
    this.#store.select(selectGenreMovieById(id));

  constructor() {
    const resolverData: Data = this.#activatedRoute.snapshot.data;
    this.#store.dispatch(updateMovie({ movie: resolverData['movieGenre'] }));
    this.#store.dispatch(updateTv({ tv: resolverData['tvGenre'] }));
    this.#store
      .select(selectGenreMovie)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => console.log(data),
      });
    this.#genreMovieById$(10751)
      .pipe(takeUntilDestroyed())
      .subscribe({ next: (data) => console.log({ genre: data }) });
    this.#genreTvById$(18)
      .pipe(takeUntilDestroyed())
      .subscribe({ next: (data) => console.log({ genre: data }) });
  }
}
