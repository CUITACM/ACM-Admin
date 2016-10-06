import { CALL_API } from 'redux-api-middleware';
import { withToken } from 'helpers/auth';
import { withParams } from 'helpers/utils';
import * as actionTypes from 'constants/actionTypes';
import * as api from 'constants/endpoints';

export function fetchUsers({ page = 1, per = 20, ...args } = {}) {
  return {
    [CALL_API]: {
      endpoint: withParams(api.FETCH_USERS.endpoint, {
        page, per, ...args
      }),
      method: api.FETCH_USERS.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      types: [
        actionTypes.FETCH_USERS_REQUEST,
        actionTypes.FETCH_USERS_SUCCESS,
        actionTypes.FETCH_USERS_FAILURE
      ]
    }
  };
}

export function fetchOneUser(id) {
  return {
    [CALL_API]: {
      endpoint: api.FETCH_ONE_USER.endpoint(id),
      method: api.FETCH_ONE_USER.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      types: [
        actionTypes.FETCH_ONE_USER_REQUEST,
        actionTypes.FETCH_ONE_USER_SUCCESS,
        actionTypes.FETCH_ONE_USER_FAILURE
      ]
    }
  };
}

export function updateUser(id, params) {
  return {
    [CALL_API]: {
      endpoint: api.UPDATE_USER.endpoint(id),
      method: api.UPDATE_USER.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      types: [
        actionTypes.UPDATE_USER_REQUEST,
        actionTypes.UPDATE_USER_SUCCESS,
        actionTypes.UPDATE_USER_FAILURE
      ]
    }
  };
}
