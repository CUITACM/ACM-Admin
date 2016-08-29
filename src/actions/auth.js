import { CALL_API } from 'redux-api-middleware';
import { LOGIN } from '../constants/endpoints';
import * as actionTypes from '../constants/actionTypes';

export function login(nickname, password) {
  return {
    [CALL_API]: {
      endpoint: LOGIN.endpoint,
      method: LOGIN.method,
      body: JSON.stringify({
        nickname, password
      }),
      types: [
        actionTypes.LOGIN_REQUEST,
        {
          type: actionTypes.LOGIN_SUCCESS,
          payload: (action, state, res) => {
            console.log(res);
            return res;
          }
        },
        actionTypes.LOGIN_FAILURE
      ]
    }
  };
}

export function checkToken() {
  // TODO
}

