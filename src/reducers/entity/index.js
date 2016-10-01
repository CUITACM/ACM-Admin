import { combineReducers } from 'redux';
import user from './user';
import article from './article';
import resource from './resource';

const entityReducer = combineReducers({
  user,
  article,
  resource
});

export default entityReducer;
