import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions/index';
import DeviceInfo from 'react-native-device-info';
import { COUNTRY_CODE } from '../shared/constants/common';
import { getTopHeadlines, getSearchResults, getNewsSources } from '../services/news'

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
    let result = yield getTopHeadlines(searchParamas);
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
    let result = yield getSearchResults(searchParamas);
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
    let result = yield getNewsSources();
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