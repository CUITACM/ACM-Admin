import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import { validateLogin } from 'services/auth';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminApp from './admin/AdminApp';
import AdminIndex from './admin/AdminIndex';
import AdminUser from './admin/AdminUser';
import AdminArticle from './admin/AdminArticle';
import ArticleEdit from './admin/ArticleEdit';
import AdminResource from './admin/AdminResource';

/* eslint react/prop-types:0 */
export default ({ history }) => (
  <Router history={history}>
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/register" component={Register} />
    <Route path="/admin" component={AdminApp} onEnter={validateLogin}>
      <IndexRedirect to="/admin/main" />
      <Route path="main" component={AdminIndex} />
      <Route path="users" component={AdminUser} />
      <Route path="articles" component={AdminArticle} />
      <Route path="articles/edit/:id" component={ArticleEdit} />
      <Route path="resources" component={AdminResource} />
    </Route>
  </Router>
);
