import { Map } from 'immutable';
import * as Actions from '../actions/index';

/**
  * Initial state 
*/
const initialState = Map({
  newsList: "",
  newsSources: ""
});

/**
  * News reducer 
  * @param state / initialState 
  * @return action
*/
export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NEWSLIST:
      return state;

    case Actions.GET_NEWS_SOURCES:
      return state;

    case Actions.GET_NEWSLIST_SUCCESS:
      return state.set('newsList', action.payload);

    case Actions.GET_NEWSLIST_FAILURE:
      return state;

    case Actions.GET_NEWSLIST_SEARCH:
      return state;

    case Actions.GET_NEWS_SOURCES_SUCCESS:
      return state.set('newsSources', action.payload);

    case Actions.GET_NEWS_SOURCES_FAILURE:
      return state;

    default:
      return state;
  }
}