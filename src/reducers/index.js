import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import errors from './errors';
import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
  routing,
  errors,
  auth,
  entities,
  users
});

export default rootReducer;
