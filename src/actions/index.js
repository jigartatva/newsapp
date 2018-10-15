/* App Actions */
export const SET_LOADER = 'SET_LOADER';

/* Set loader case */
export const setLoader = (value) => ({ type: SET_LOADER, payload: value });

/* News Actions */
export const GET_NEWSLIST = 'GET_NEWSLIST';
export const GET_NEWSLIST_SEARCH = 'GET_NEWSLIST_SEARCH';
export const GET_NEWS_SOURCES = 'GET_NEWS_SOURCES';

export const GET_NEWSLIST_SUCCESS = 'GET_NEWSLIST_SUCCESS';
export const GET_NEWSLIST_FAILURE = 'GET_NEWSLIST_FAILURE';

export const GET_NEWS_SOURCES_SUCCESS = 'GET_NEWS_SOURCES_SUCCESS';
export const GET_NEWS_SOURCES_FAILURE = 'GET_NEWS_SOURCES_FAILURE';

/* get cases for news list success & failure */
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