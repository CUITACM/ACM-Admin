import { combineReducers } from 'redux';
import user from './user';

const adminReducer = combineReducers({
  user
});

export default adminReducer;
