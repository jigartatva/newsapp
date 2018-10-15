import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions/index';

import { API_ROOT, API_KEY } from '../services/apiConfig';

import DeviceInfo from 'react-native-device-info';

const deviceCountry = DeviceInfo.getDeviceCountry();

/**
  * Get news list watcher 
*/
function* getNewsListWatcher() {
  yield takeLatest(Actions.GET_NEWSLIST, getNewsListHandler);
}

/**
  * Get news list by search watcher 
*/
function* getNewsListBySearchWatcher() {
  yield takeLatest(Actions.GET_NEWSLIST_SEARCH, getNewsListBySearchHandler);
}

/**
  * Get news source watcher 
*/
function* getNewsSourcesWatcher() {
  yield takeLatest(Actions.GET_NEWS_SOURCES, getNewsSourcesHandler);
}

/**
  * Get news list 
  * @param value 
*/
function* getNewsListHandler(value) {
  yield put(Actions.setLoader(true));
  var searchParamas = value.payload;
  try {
    const requestUrl =
      searchParamas.searchIdString != ""
        ? `${API_ROOT}/top-headlines?page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sources=${searchParamas.searchIdString}&apiKey=${API_KEY}`
        : `${API_ROOT}/top-headlines?country=${deviceCountry}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(Actions.getNewsListSuccess(result));
    } else {
      yield put(Actions.getNewsListFail(""));
    }
  } catch (error) {
    yield put(Actions.getNewsListFail(""));
  }
  yield put(Actions.setLoader(false));
}

/**
  * To Get All News List By Search Keyword 
  * @param value 
*/
function* getNewsListBySearchHandler(value) {
  yield put(Actions.setLoader(true));
  var searchParamas = value.payload;
  try {
    const requestUrl =
      searchParamas.searchIdString != ""
        ? `${API_ROOT}/everything?q=${searchParamas.searchby}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sources=${searchParamas.searchIdString}&sortBy=relevancy&apiKey=${API_KEY}`
        : `${API_ROOT}/everything?q=${searchParamas.searchby}&page=${searchParamas.page}&pagesize=${searchParamas.pagesize}&sortBy=relevancy&apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(Actions.getNewsListSuccess(result));
    } else {
      yield put(Actions.getNewsListFail(""));
    }

  } catch (error) {
    yield put(Actions.getNewsListFail(""));
  }
  yield put(Actions.setLoader(false));
}

/**
  * To get news source handler
*/
function* getNewsSourcesHandler() {
  yield put(Actions.setLoader(true));
  try {
    const requestUrl = `${API_ROOT}/sources?apiKey=${API_KEY}`;
    let result = yield fetch(requestUrl)
      .then(response => response.json());
    if (result.status === "ok") {
      yield put(Actions.getNewsSourcesSuccess(result.sources));
    } else {
      yield put(Actions.getNewsSourcesFailure(""));
    }
  } catch (error) {
    yield put(Actions.getNewsSourcesFailure(""));
  }
  yield put(Actions.setLoader(false));
}

export default [
  getNewsListWatcher,
  getNewsListBySearchWatcher,
  getNewsSourcesWatcher
];