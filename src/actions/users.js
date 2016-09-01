import { CALL_API } from 'redux-api-middleware';
import { FETCH_USERS } from '../constants/endpoints';
import { withToken } from '../helpers/auth';
import * as actionTypes from '../constants/actionTypes';

export function fetchUsers(page = 1, per = 20) {
  return {
    [CALL_API]: {
      endpoint: FETCH_USERS.endpoint,
      method: FETCH_USERS.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        page, per
      }),
      types: [
        actionTypes.FETCH_USERS_REQUEST,
        actionTypes.FETCH_USERS_SUCCESS,
        actionTypes.FETCH_USERS_FAILURE
      ]
    }
  };
}
