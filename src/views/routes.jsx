import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { validateLogin } from 'helpers/auth';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AdminApp from './AdminApp';
import AdminUser from './AdminUser';

export default (
  <Route path="/" >
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="admin" component={AdminApp} onEnter={validateLogin}>
      <IndexRedirect to="users" />
      <Route path="users" component={AdminUser} />
    </Route>
  </Route>
);
