import { Map } from 'immutable';
import * as Actions from '../actions/index';
/**
  * Initial state 
*/
const initialState = Map({
  loading: false
});

/**
  * News reducer 
  * @param state / initialState 
  * @param action
  * @return updated state
*/
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_LOADER:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}