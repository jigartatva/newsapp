import { all, fork } from 'redux-saga/effects';
import newsSaga from './news';

const forkList = (sagasList) => sagasList.map(saga => fork(saga));

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    ...forkList(newsSaga)
  ])
}