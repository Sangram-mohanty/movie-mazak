import { ActionReducer } from '@ngrx/store';
import { FeatureKey } from './states';
import { Selectors } from './selectors';
import { genreReducer } from './genre/reducer';

export type Store = {
  [x in FeatureKey]: ActionReducer<Selectors[x]>;
};

export const store: Store = {
  [FeatureKey.genre]: genreReducer,
};
