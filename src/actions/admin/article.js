import { CALL_API } from 'redux-api-middleware';
import { FETCH_ARTICLES } from 'constants/endpoints';
import { withToken } from 'helpers/auth';
import { withParams } from 'helpers/utils';
import * as actionTypes from 'constants/actionTypes';

export function fetchArticles({ page = 1, per = 20, ...args } = {}) {
  return {
    [CALL_API]: {
      endpoint: withParams(FETCH_ARTICLES.endpoint, {
        page, per, ...args
      }),
      method: FETCH_ARTICLES.method,
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
