import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initState) {
  const store = createStore(
    rootReducer,
    initState,
    compose(
      applyMiddleware(thunkMiddleware, apiMiddleware, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
