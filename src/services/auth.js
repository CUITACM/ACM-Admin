import request from 'utils/request';
import * as persistence from 'utils/persistence';
import { API_ROOT } from 'src/config';
import qs from 'qs';

const tokenKey = 'acm_meter_token';

export function fetchToken(nickname, password) {
  const params = { nickname, password };
  return request(`${API_ROOT}/auth/token?${qs.stringify(params)}`);
}

export function getToken() {
  const tokenObject = persistence.takeObject(tokenKey);
  return tokenObject && tokenObject.token;
}

export function saveToken(params) {
  persistence.saveObject(tokenKey, {
    token: params.token,
    expired_time: Date.now() + (params.expire_time * 1000)
  });
}

export function removeToken() {
  persistence.remove(tokenKey);
}

export function hasLogin() {
  const tokenObject = persistence.takeObject(tokenKey);
  if (tokenObject == null || tokenObject.expired_time < Date.now()) {
    persistence.remove(tokenKey);
    return false;
  }
  return true;
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


