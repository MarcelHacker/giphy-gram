import { createReducer, on } from '@ngrx/store';
import { saveGif, removeGif } from './storage.actions';

export const initialState = 0;

const _gifReducer = createReducer(
  initialState,
  on(saveGif, (state) => (state = 1)),
  on(removeGif, (state) => (state = -1))
);

export function gifReducer(state: any, action: any) {
  return _gifReducer(state, action);
}
