import { Map } from 'immutable';
/* News action types */
export const GET_NEWSLIST = 'GET_NEWSLIST';
export const GET_NEWSLIST_SEARCH = 'GET_NEWSLIST_SEARCH';
export const GET_NEWS_SOURCES = 'GET_NEWS_SOURCES';

const GET_NEWSLIST_SUCCESS = 'GET_NEWSLIST_SUCCESS';
const GET_NEWSLIST_FAILURE = 'GET_NEWSLIST_FAILURE';

const GET_NEWS_SOURCES_SUCCESS = 'GET_NEWS_SOURCES_SUCCESS';
const GET_NEWS_SOURCES_FAILURE = 'GET_NEWS_SOURCES_FAILURE';

/* get cases for news list success & failure*/
export const getNewsList = (page, pagesize, searchIdString) => ({
  type: GET_NEWSLIST,
  payload: { page: page, pagesize: pagesize, searchIdString: searchIdString }
});

export const getNewsSources = (value) => ({
  type: GET_NEWS_SOURCES,
  payload: JSON.stringify(value)
});

export const getNewsListSuccess = (value) => ({
  type: GET_NEWSLIST_SUCCESS,
  payload: JSON.stringify(value)
});

export const getNewsListFail = (value) => ({
  type: GET_NEWSLIST_FAILURE,
  payload: JSON.stringify(value)
});

export const getNewsListBySearch = (searchby, page, pagesize, searchIdString) => ({
  type: GET_NEWSLIST_SEARCH,
  payload: { page: page, pagesize: pagesize, searchby: searchby, searchIdString: searchIdString }
});

export const getNewsSourcesSuccess = (value) => ({
  type: GET_NEWS_SOURCES_SUCCESS,
  payload: JSON.stringify(value)
});

export const getNewsSourcesFailure = (value) => ({
  type: GET_NEWS_SOURCES_FAILURE,
  payload: JSON.stringify(value)
});

/* Initial state */
const initialState = Map({
  newsList: "",
  newsSources: ""
});

/* News reducer */
export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEWSLIST:
      return state;

    case GET_NEWS_SOURCES:
      return state;

    case GET_NEWSLIST_SUCCESS:
      return state.set('newsList', action.payload);

    case GET_NEWSLIST_FAILURE:
      return state;

    case GET_NEWSLIST_SEARCH:
      return state;

    case GET_NEWS_SOURCES_SUCCESS:
      return state.set('newsSources', action.payload);

    case GET_NEWS_SOURCES_FAILURE:
      return state;

    default:
      return state;
  }
}