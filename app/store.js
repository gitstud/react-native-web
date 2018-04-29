import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Router from './Router';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const initialState = {};

// const navMiddleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav,
// )

const middleware = [
  thunk,
  // navMiddleware,
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
