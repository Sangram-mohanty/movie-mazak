import { Component, DestroyRef, inject } from '@angular/core';
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
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { HomeForm, HomeFormGroup, RadioType } from './types/home-form';
import { RadioButtonModule } from 'primeng/radiobutton';
import { JsonPipe, NgClass } from '@angular/common';
import { DropdownItem, DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  merge,
  Subscription,
  take,
  takeLast,
  takeUntil,
} from 'rxjs';
import { Button, ButtonDirective } from 'primeng/button';
import { GenreType } from '../../../types/genre.types';
import { Ripple } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RadioButtonModule,
    JsonPipe,
    ReactiveFormsModule,
    DropdownModule,
    ChipsModule,
    Button,
    NgClass,
    ButtonDirective,
    Ripple,
    PaginatorModule,
  ],
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
  protected homeForm: FormGroup<HomeForm> = new FormGroup<HomeForm>({
    items: new FormArray<FormGroup<HomeFormGroup>>([]),
  });
  protected readonly genreType = RadioType;
  protected readonly genres = Object.values(RadioType).map(g => g);
  private readonly destroy = inject(DestroyRef);
  private items$: Subscription[] = [];
  get homeFormItems() {
    return this.homeForm.controls.items;
  }
  constructor() {
    this.addFormGroup();
    const resolverData: Data = this.#activatedRoute.snapshot.data;
    this.#store.dispatch(updateMovie({ movie: resolverData['movieGenre'] }));
    this.#store.dispatch(updateTv({ tv: resolverData['tvGenre'] }));
    this.#store
      .select(selectGenreMovie)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: data => console.log(data),
      });
    this.#genreMovieById$(10751)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({ next: data => console.log({ genre: data }) });
    this.#genreTvById$(18)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({ next: data => console.log({ genre: data }) });
  }

  addFormGroup(): void {
    if (this.homeFormItems.length > 2) {
      return;
    }
    const emptyHomeForm: FormGroup<HomeFormGroup> = new FormGroup({
      input: new FormControl<string | null>(null),
      radio: new FormControl<RadioType | null>(null),
      dropdown: new FormControl<DropdownItem | null>(null),
    });
    this.homeFormItems.push(emptyHomeForm);
    this.addControlToSubscription(emptyHomeForm.controls.radio);
  }

  private addControlToSubscription(radio: FormControl<RadioType | null>) {
    radio.valueChanges.pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: data => console.log(data, radio.parent?.getRawValue()),
    });
  }
}
