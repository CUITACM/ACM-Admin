import { CALL_API } from 'redux-api-middleware';
import * as api from 'constants/endpoints';
import * as actionTypes from 'constants/actionTypes';
import * as authHelpers from 'helpers/auth';

export function login(nickname, password) {
  return {
    [CALL_API]: {
      endpoint: api.LOGIN.endpoint,
      method: api.LOGIN.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname, password
      }),
      types: [
        actionTypes.LOGIN_REQUEST,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE
      ]
    }
  };
}

export function register(params) {
  return {
    [CALL_API]: {
      endpoint: api.REGISTER.endpoint,
      method: api.REGISTER.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
      types: [
        actionTypes.REGISTER_REQUEST,
        actionTypes.REGISTER_SUCCESS,
        actionTypes.REGISTER_FAILURE
      ]
    }
  };
}

export function loadCurrentUser() {
  const currentUser = authHelpers.takeCurrentUser();
  return {
    type: actionTypes.LOAD_CURRENT_USER,
    payload: {
      user: currentUser
    }
  };
}

export function logout() {
  authHelpers.removeCurrentUser();
  return {
    type: actionTypes.LOGOUT
  };
}


