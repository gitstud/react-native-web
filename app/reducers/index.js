import { combineReducers } from 'redux';

import Router from '../Router';

// const initialState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('Splash'));
const initialState = {};

const navReducer = (state = initialState, action) => {
  // const nextState = Router.router.getStateForAction(action, state);
  return state;
}

export default combineReducers({
  nav: navReducer,
});
