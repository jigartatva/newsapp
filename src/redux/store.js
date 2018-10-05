/* import redux and redux-saga libraries */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import createSagaMiddleware from 'redux-saga';
/* import combine reducers and sagas*/
import reducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

/**
  * To configure store
  * @param store 
*/
export default function configureStore() {
    // define store middlewares as an array
    const middlewares = [
        thunk,
        sagaMiddleware
    ];

  const store = createStore(
    reducer,
    applyMiddleware(...middlewares),
    reduxLoop.install()
  )
  
  sagaMiddleware.run(rootSaga);
  return store;
}