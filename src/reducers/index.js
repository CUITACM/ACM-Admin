import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  auth,
  entities
});

export default rootReducer;
