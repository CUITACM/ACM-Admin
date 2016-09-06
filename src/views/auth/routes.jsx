import Auth from './Auth';

export default {
  path: 'auth',
  component: Auth,
  childRoutes: [
    {
      path: 'login',
      getComponent(partialNextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./Login').default);
        }, 'auth.login');
      }
    },
    {
      path: 'register',
      getComponent(partialNextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./Register').default);
        }, 'auth.register');
      }
    }
  ]
};
