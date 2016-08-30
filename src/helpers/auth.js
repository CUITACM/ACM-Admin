import * as persistence from 'helpers/persistence';

const currentUserKey = 'acm_meter_current_user';

export function keepCurrentUser(currentUser) {
  persistence.keepObject(currentUserKey, currentUser);
}

export function takeCurrentUser() {
  return persistence.takeObject(currentUserKey);
}

export function getToken() {
  const currentUser = takeCurrentUser();
  return currentUser && currentUser.token;
}

export function validateLogin(next, replace, callback) {
  const hasLogin = getToken() != null;
  if (!hasLogin && next.location.pathname !== '/login') {
    replace('/login');
  }
  callback();
}
