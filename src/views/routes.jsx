import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { validateLogin } from 'helpers/auth';
import Auth from './auth/Auth';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import AdminApp from './admin/AdminApp';
import AdminUser from './admin/AdminUser';
import AdminArticle from './admin/AdminArticle';

export default (
  <Route path="/" >
    <IndexRoute component={Home} />
    <Route path="auth" component={Auth} >
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>
    <Route path="admin" component={AdminApp} onEnter={validateLogin}>
      <IndexRedirect to="users" />
      <Route path="users" component={AdminUser} />
      <Route path="articles" component={AdminArticle} />
    </Route>
  </Route>
);
