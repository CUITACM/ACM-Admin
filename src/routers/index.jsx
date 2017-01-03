import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import { validateLogin } from 'services/auth';
import Login from './auth/Login';
import Register from './auth/Register';
import AppLayout from './main/AppLayout';
import AdminIndex from './admin/AdminIndex';
import AdminUser from './user/AdminUser';
import AdminArticle from './article/AdminArticle';
import ArticleEdit from './article/ArticleEdit';
import AdminResource from './resource/AdminResource';
import SpiderAccount from './spider/SpiderAccount';
import SpiderSubmit from './spider/SpiderSubmit';

/* eslint react/prop-types:0 */
export default ({ history }) => (
  <Router history={history}>
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/register" component={Register} />
    <Route path="/admin" component={AppLayout} onEnter={validateLogin}>
      <IndexRedirect to="/admin/main" />
      <Route path="main" component={AdminIndex} />
      <Route path="users" component={AdminUser} />
      <Route path="articles">
        <IndexRedirect to="news" />
        <Route path=":type" component={AdminArticle} />
        <Route path="edit/:id" component={ArticleEdit} />
      </Route>
      <Route path="resources" component={AdminResource} />
      <Route path="spiders">
        <IndexRedirect to="accounts" />
        <Route path="accounts" component={SpiderAccount} />
        <Route path="submits" component={SpiderSubmit} />
      </Route>
    </Route>
  </Router>
);
