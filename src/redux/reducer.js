import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import appReducer from './appReducer';
import newsReducer from './newsReducer';
const RESET_STATE = 'RESET_STATE';

const reducers = {
  appReducer: appReducer,
  newsReducer: newsReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const rootReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? rootReducer(action.payload, action)
    : rootReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}