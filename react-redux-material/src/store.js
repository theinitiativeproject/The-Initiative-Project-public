import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { saveState, loadState } from '../../localStorage.js';
import { throttle } from 'lodash';

const initialState = loadState();

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(throttle(() => saveState(store.getState()), 250));

export default store;
