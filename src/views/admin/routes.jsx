import { validateLogin } from 'helpers/auth';
import AdminApp from './AdminApp';

export default {
  path: 'admin',
  component: AdminApp,
  onEnter: validateLogin,
  childRoutes: [
    {
      path: 'users',
      getComponent(partialNextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./AdminUser').default);
        }, 'admin.user');
      }
    },
    {
      path: 'articles',
      getComponent(partialNextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./AdminArticle').default);
        }, 'admin.article');
      }
    }
  ]
};
