import * as persistence from './persistence';

const currentUserKey = 'acm_meter_current_user';
const threeDays = 259200000;

export function keepCurrentUser(currentUser) {
  const curUser = {
    ...currentUser,
    authenticated_at: Date.now()
  };
  persistence.keepObject(currentUserKey, curUser);
}

export function takeCurrentUser() {
  return persistence.takeObject(currentUserKey);
}

export function isAdmin(user) {
  return user && user.role >= 4;
}

export function removeCurrentUser() {
  persistence.remove(currentUserKey);
}

export function getToken() {
  const currentUser = takeCurrentUser();
  return currentUser && currentUser.token;
}

export function withToken(headers = {}) {
  return {
    ...headers,
    'Authorization': `Token token=${getToken()}`
  };
}

export function hasLogin() {
  const currentUser = takeCurrentUser();
  if (!currentUser) return false;
  const authenticatedAt = currentUser.authenticated_at;
  return Date.now() - authenticatedAt < threeDays;
}

export function validateLogin(nextState, replace, callback) {
  const isLogin = hasLogin();
  if (!isLogin && nextState.location.pathname !== '/auth/login') {
    replace({
      pathname: '/auth/login',
      query: { next: nextState.location.pathname }
    });
  }
  callback();
}
