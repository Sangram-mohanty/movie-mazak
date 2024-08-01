import {Genre, GenreType} from "../../types/genre.types";

export enum FeatureKey {
  genre = 'genre',
}

export type genreState = {
  [x in GenreType]: Genre[];
};
