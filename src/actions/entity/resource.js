import { CALL_API } from 'redux-api-middleware';
import { withToken } from 'helpers/auth';
import { withParams } from 'helpers/utils';
import request from 'helpers/request';
import * as actionTypes from 'constants/actionTypes';
import * as api from 'constants/endpoints';

export function fetchResources({ page = 1, per = 20, ...args } = {}) {
  return {
    [CALL_API]: {
      endpoint: withParams(api.FETCH_RESOURCES.endpoint, {
        page, per, ...args
      }),
      method: api.FETCH_RESOURCES.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      types: [
        actionTypes.FETCH_RESOURCES_REQUEST,
        actionTypes.FETCH_RESOURCES_SUCCESS,
        actionTypes.FETCH_RESOURCES_FAILURE
      ]
    }
  };
}

export function fetchOneResource(id) {
  return {
    [CALL_API]: {
      endpoint: api.FETCH_ONE_ARTICLE.endpoint(id),
      method: api.FETCH_ONE_ARTICLE.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      types: [
        actionTypes.FETCH_ONE_ARTICLE_REQUEST,
        actionTypes.FETCH_ONE_ARTICLE_SUCCESS,
        actionTypes.FETCH_ONE_ARTICLE_FAILURE
      ]
    }
  };
}

export function createResource(params) {
  const data = new FormData();
  Object.keys(params).forEach(key => {
    data.append(key, params[key]);
  });
  return request(api.CREATE_RESOURCE.endpoint, {
    method: api.CREATE_RESOURCE.method,
    headers: withToken(),
    body: data,
  });
}


export function deleteResource(id) {
  return request(api.DELETE_RESOURCE.endpoint(id), {
    method: api.DELETE_RESOURCE.method,
    headers: withToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
  });
}
