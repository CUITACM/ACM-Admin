import * as persistence from 'helpers/persistence';

const currentUserKey = 'acm_meter_current_user';
const threeDays = 259200000;

export function keepCurrentUser(currentUser) {
  currentUser.authenticated_at = Date.now();
  persistence.keepObject(currentUserKey, currentUser);
}

export function takeCurrentUser() {
  return persistence.takeObject(currentUserKey);
}

export function getToken() {
  const currentUser = takeCurrentUser();
  return currentUser && currentUser.token;
}

export function hasLogin() {
  const currentUser = takeCurrentUser();
  if (!currentUser) return false;
  const authenticated_at = currentUser.authenticated_at;
  return Date.now() - authenticated_at < threeDays;
}

export function validateLogin(next, replace, callback) {
  const isLogin = hasLogin();
  if (!isLogin && next.location.pathname !== '/login') {
    replace('/login');
  }
  callback();
}
