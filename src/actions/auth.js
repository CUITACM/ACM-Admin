import { CALL_API } from 'redux-api-middleware';
import { LOGIN } from '../constants/endpoints';
import * as actionTypes from '../constants/actionTypes';

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

export function checkToken() {
  // TODO
}

