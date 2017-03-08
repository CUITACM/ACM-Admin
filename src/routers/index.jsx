import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import { validateLogin } from 'services/auth';

// auth
import Login from './auth/Login';
import Register from './auth/Register';

// main
import AdminLayout from './main/AdminLayout';
import Dashboard from './main/Dashboard';

// user
import AdminUser from './user/AdminUser';
import Newcomers from './user/Newcomers';
import UserEdit from './user/UserEdit';

// article
import AdminArticle from './article/AdminArticle';
import ArticleEdit from './article/ArticleEdit';

// resource
import AdminResource from './resource/AdminResource';

// spider
import SpiderAccount from './spider/SpiderAccount';
import SpiderSubmit from './spider/SpiderSubmit';
import SpiderWorker from './spider/SpiderWorker';

// achievement
import AdminAchievement from './achievement/AdminAchievement';
import AchievementEdit from './achievement/AchievementEdit';

// honor
import AdminHonor from './honor/AdminHonor';
import HonorEdit from './honor/HonorEdit';

/* eslint react/prop-types:0 */
export default ({ history }) => (
  <Router history={history}>
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/register" component={Register} />
    <Route path="/admin" component={AdminLayout} onEnter={validateLogin}>
      <IndexRedirect to="/admin/main" />
      <Route path="main" >
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={Dashboard} />
      </Route>
      <Route path="users">
        <IndexRedirect to="list" />
        <Route path="list" component={AdminUser} />
        <Route path="newcomers" component={Newcomers} />
        <Route path="edit/:id" component={UserEdit} />
      </Route>
      <Route path="articles">
        <IndexRedirect to="news" />
        <Route path=":type" component={AdminArticle} />
        <Route path="news/create" component={ArticleEdit} />
        <Route path="edit/:id" component={ArticleEdit} />
      </Route>
      <Route path="resources" >
        <IndexRedirect to="list" />
        <Route path="list" component={AdminResource} />
      </Route>
      <Route path="spiders">
        <IndexRedirect to="accounts" />
        <Route path="accounts" component={SpiderAccount} />
        <Route path="submits" component={SpiderSubmit} />
        <Route path="workers" component={SpiderWorker} />
      </Route>
      <Route path="achievements" >
        <IndexRedirect to="list" />
        <Route path="list" component={AdminAchievement} />
        <Route path="create" component={AchievementEdit} />
        <Route path="edit/:id" component={AchievementEdit} />
      </Route>
      <Route path="honors" >
        <IndexRedirect to="list" />
        <Route path="list" component={AdminHonor} />
        <Route path="create" component={HonorEdit} />
        <Route path="edit/:id" component={HonorEdit} />
      </Route>
    </Route>
  </Router>
);
