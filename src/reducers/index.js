import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import entity from './entity';

const rootReducer = combineReducers({
  routing,
  auth,
  entity
});

export default rootReducer;
