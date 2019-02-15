import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer';

export const makeStore = () =>
  createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));
