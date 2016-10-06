import { CALL_API } from 'redux-api-middleware';
import { withToken } from 'helpers/auth';
import { withParams } from 'helpers/utils';
import request from 'helpers/request';
import * as actionTypes from 'constants/actionTypes';
import * as api from 'constants/endpoints';

export function fetchArticles({ page = 1, per = 20, ...args } = {}) {
  return {
    [CALL_API]: {
      endpoint: withParams(api.FETCH_ARTICLES.endpoint, {
        page, per, ...args
      }),
      method: api.FETCH_ARTICLES.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      types: [
        actionTypes.FETCH_ARTICLES_REQUEST,
        actionTypes.FETCH_ARTICLES_SUCCESS,
        actionTypes.FETCH_ARTICLES_FAILURE
      ]
    }
  };
}

export function fetchOneArticle(id) {
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

export function createArticle(params) {
  return {
    [CALL_API]: {
      endpoint: api.CREATE_ARTICLE.endpoint,
      method: api.CREATE_ARTICLE.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      types: [
        actionTypes.CREATE_ARTICLE_REQUEST,
        actionTypes.CREATE_ARTICLE_SUCCESS,
        actionTypes.CREATE_ARTICLE_FAILURE
      ]
    }
  };
}

export function updateArticle(params, id) {
  return {
    [CALL_API]: {
      endpoint: api.UPDATE_ARTICLE.endpoint(id),
      method: api.UPDATE_ARTICLE.method,
      headers: withToken({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      types: [
        actionTypes.UPDATE_ARTICLE_REQUEST,
        actionTypes.UPDATE_ARTICLE_SUCCESS,
        actionTypes.UPDATE_ARTICLE_FAILURE
      ]
    }
  };
}

export function deleteArticle(id) {
  return request(api.DELETE_ARTICLE.endpoint(id), {
    method: api.DELETE_ARTICLE.method,
    headers: withToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
  });
}
