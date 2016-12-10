import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import { validateLogin } from 'services/auth';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminApp from './admin/AdminApp';
import AdminUser from './admin/AdminUser';
import AdminArticle from './admin/AdminArticle';

/* eslint react/prop-types:0 */
export default ({ history }) => (
  <Router history={history}>
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/register" component={Register} />
    <Route path="/admin" component={AdminApp} onEnter={validateLogin}>
      <IndexRoute component={AdminApp} />
      <Route path="users" component={AdminUser} />
      <Route path="articles" component={AdminArticle} />
    </Route>
  </Router>
);
