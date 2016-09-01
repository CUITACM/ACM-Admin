import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from 'reducers';

export default function configureStore(initState) {
  return createStore(
    rootReducer,
    initState,
    applyMiddleware(thunkMiddleware, apiMiddleware)
  );
}
