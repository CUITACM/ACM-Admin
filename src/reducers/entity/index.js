import { combineReducers } from 'redux';
import user from './user';
import article from './article';

const entityReducer = combineReducers({
  user,
  article
});

export default entityReducer;
