import React from 'react';
import { Router, Route } from 'dva/router';
import Login from './auth/Login';
import Register from './auth/Register';

/* eslint react/prop-types:0 */
export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
    </Router>
  );
}
