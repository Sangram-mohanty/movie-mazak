import {createReducer, on} from "@ngrx/store";
import {genreState} from "../states";
import {updateMovie, updateTv} from "./actions";

export const INITIAL_STATE: genreState = {movie: [], tv: []}
export const genreReducer = createReducer(INITIAL_STATE,
  on(updateMovie,  ((INITIAL_STATE, {movie}) => ({...INITIAL_STATE, movie }))),
  on(updateTv,  ((INITIAL_STATE, {tv}) => ({...INITIAL_STATE, tv }))),
)
