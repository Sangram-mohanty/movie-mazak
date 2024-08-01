import { createAction, props } from '@ngrx/store';
import { Genre } from '../../../types/genre.types';

const getAction = (action: string) => `[${action} Action]`;
const getActionType = (action: string, actionType: string) =>
  `${action} ${actionType}`;

const action = getAction('Genre');
export const getMovie = createAction(getActionType(action, 'Get Movie'));
export const updateMovie = createAction(
  getActionType(action, 'Update Movie'),
  props<{ movie: Genre[] }>()
);
export const getTv = createAction(getActionType(action, 'Get TV'));
export const updateTv = createAction(
  getActionType(action, 'Update TV'),
  props<{ tv: Genre[] }>()
);
