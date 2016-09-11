import Auth from './Auth';

export default {
  path: 'auth',
  component: Auth,
  getChildRoutes(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, [
        {
          path: 'login',
          component: require('./Login').default
        },
        {
          path: 'register',
          component: require('./Register').default
        }
      ]);
    }, 'auth');
  }
};
