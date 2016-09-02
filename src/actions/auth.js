import { CALL_API } from 'redux-api-middleware';
import { LOGIN, REGISTER } from 'constants/endpoints';
import * as actionTypes from 'constants/actionTypes';

export function login(nickname, password) {
  return {
    [CALL_API]: {
      endpoint: LOGIN.endpoint,
      method: LOGIN.method,
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
      endpoint: REGISTER.endpoint,
      method: REGISTER.method,
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

export function loadCurrentUser(currentUser) {
  return {
    type: actionTypes.LOAD_CURRENT_USER,
    payload: {
      user: currentUser
    }
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}


