import IndexApp from './IndexApp';

export default {
  path: 'index',
  component: IndexApp,
  getChildRoutes(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, [
        {
          path: 'home',
          component: require('./Home').default
        },
      ]);
    }, 'main');
  }
};
