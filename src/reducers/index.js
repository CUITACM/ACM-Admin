import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import admin from './admin';

const rootReducer = combineReducers({
  routing,
  auth,
  admin
});

export default rootReducer;
