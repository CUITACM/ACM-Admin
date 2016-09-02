import { combineReducers } from 'redux';
import user from './user';
import article from './article';

const adminReducer = combineReducers({
  user,
  article
});

export default adminReducer;
