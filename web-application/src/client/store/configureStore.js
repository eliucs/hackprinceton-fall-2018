import { createStore, combineReducers } from 'redux';
import { reducer as tooltip } from 'redux-tooltip';

const initialState = {
  title: 'with redux tooltip',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default (initState = { appReducer: initialState }) => {
  const store = createStore(
    combineReducers({ appReducer, tooltip }), initState,
  );
  return store;
};
