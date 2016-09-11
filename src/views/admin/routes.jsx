import { validateLogin } from 'helpers/auth';
import AdminApp from './AdminApp';

export default {
  path: 'admin',
  component: AdminApp,
  onEnter: validateLogin,
  getChildRoutes(partialNextState, callback) {
    require.ensure([], (require) => {
      callback(null, [
        {
          path: 'users',
          component: require('./AdminUser').default
        },
        {
          path: 'articles',
          component: require('./AdminArticle').default
        },
        {
          path: 'articles/create',
          component: require('./ArticleCreate').default
        },
        {
          path: 'articles/edit/:id',
          component: require('./ArticleEdit').default
        }
      ]);
    }, 'admin');
  }
};
