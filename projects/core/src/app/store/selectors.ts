import { FeatureKey, genreState } from './states';

export interface Selectors {
  [FeatureKey.genre]: genreState;
}
