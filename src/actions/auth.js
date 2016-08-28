import { CALL_API } from 'redux-api-middleware';
import { LOGIN } from 'src/constants/endpoints';
import * as actionTypes from 'src/constants/actionTypes';

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
        {
          type: actionTypes.LOGIN_SUCCESS,
          payload: (action, state, res) => {
            console.log(action, state, res);
            return res;
          }
        },
        actionTypes.LOGIN_FAILURE
      ]
    }
  }
}