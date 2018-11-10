import { createStore, combineReducers } from 'redux';
import { TestReducer } from 'reducers';

export default () => {
  const store = createStore(combineReducers({
    testValue: TestReducer,
  }));
  return store;
};
