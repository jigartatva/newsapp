import { Map } from 'immutable';
const SET_LOADER = 'SET_LOADER';
/* Set loader case*/
export const setLoader = (value) => ({ type: SET_LOADER, payload: value });

/* Initial state */
const initialState = Map({
  loading: false
});

/* News reducer */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}