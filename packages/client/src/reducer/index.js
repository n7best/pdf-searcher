import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import patients from './patients';

const rootReducer = combineReducers({ auth, user, patients });

export default rootReducer;
