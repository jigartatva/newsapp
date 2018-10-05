import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as AppActions from '../../services/AppService';
import * as NewsActions from '../../services/NewsService';
import * as apiEndpoints from '../../services/apiConfig';

import DeviceInfo from 'react-native-device-info';

const deviceCountry = DeviceInfo.getDeviceCountry();

//set API path
const API_ROOT = apiEndpoints.api;
const API_KEY = apiEndpoints.key;

/**
  * Get news list watcher 
*/
function* getNewsListWatcher() {
  yield takeEvery(NewsActions.GET_NEWSLIST, getNewsListHandler);
}

/**
  * Get news list by search watcher 
*/
function* getNewsListBySearchWatcher() {
  yield takeLatest(NewsActions.GET_NEWSLIST_SEARCH, getNewsListBySearchHandler);
}

/**
  * Get news source watcher 
*/
function* getNewsSourcesWatcher() {
  yield takeEvery(NewsActions.GET_NEWS_SOURCES, getNewsSourcesHandler);
}

/**
  * Get news list 
  * @param value 
*/
function* getNewsListHandler(value) {
  yield put(AppActions.setLoader(true));
  var searchParamas = value.payload;
  try {
    const requestUrl =
      searchParamas.searchIdString != ""
        ? `${API_ROOT}/top-headlines?page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sources=${searchParamas.searchIdString}&apiKey=${API_KEY}`
        : `${API_ROOT}/top-headlines?country=${deviceCountry}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(NewsActions.getNewsListSuccess(result));
    } else {
      yield put(NewsActions.getNewsListFail(""));
    }
  } catch (error) {
    yield put(NewsActions.getNewsListFail(""));
  }
  yield put(AppActions.setLoader(false));
}

/**
  * To Get All News List By Search Keyword 
  * @param value 
*/
function* getNewsListBySearchHandler(value) {
  yield put(AppActions.setLoader(true));
  var searchParamas = value.payload;
  try {
    const requestUrl =
      searchParamas.searchIdString != ""
        ? `${API_ROOT}/everything?q=${searchParamas.searchby}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sources=${searchParamas.searchIdString}&sortBy=relevancy&apiKey=${API_KEY}`
        : `${API_ROOT}/everything?q=${searchParamas.searchby}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sortBy=relevancy&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(NewsActions.getNewsListSuccess(result));
    } else {
      yield put(NewsActions.getNewsListFail(""));
    }

  } catch (error) {
    yield put(NewsActions.getNewsListFail(""));
  }
  yield put(AppActions.setLoader(false));
}

/**
  * To get news source handler
*/
function* getNewsSourcesHandler() {
  yield put(AppActions.setLoader(true));
  try {
    const requestUrl = `${API_ROOT}/sources?apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(NewsActions.getNewsSourcesSuccess(result.sources));
    } else {
      yield put(NewsActions.getNewsSourcesFailure(""));
    }
  } catch (error) {
    yield put(NewsActions.getNewsSourcesFailure(""));
  }
  yield put(AppActions.setLoader(false));
}

export default [
  getNewsListWatcher,
  getNewsListBySearchWatcher,
  getNewsSourcesWatcher
];