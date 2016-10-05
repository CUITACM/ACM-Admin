import * as actionTypes from 'constants/actionTypes';
import { listReducer } from 'reducers/common';
import { composeReducers } from 'helpers/reducer';

const initState = {
  one: null,
  datas: [],
  pageSize: 10,
  pagination: {
    current_page: 1
  },
  waitFetch: false,
  fetchErrors: null,
  waitCreate: false,
  createSuccess: false,
  createErrors: null,
  waitUpdate: false,
  updateSuccess: false,
  updateErrors: null
};

function article(state = initState, action) {
  switch (action.type) {
    // fetch one article
    case actionTypes.FETCH_ONE_ARTICLE_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_ONE_ARTICLE_SUCCESS:
      return {
        ...state,
        one: action.payload.article,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_ONE_ARTICLE_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    // create article
    case actionTypes.CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        waitCreate: !action.error,
        createSuccess: false,
        createErrors: action.error ? action.payload.message : null
      };
    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        waitCreate: false,
        createSuccess: true,
        createErrors: null
      };
    case actionTypes.CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        waitCreate: false,
        createSuccess: false,
        createErrors: action.payload.message
      };
    // update article
    case actionTypes.UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        waitUpdate: !action.error,
        updateSuccess: false,
        updateErrors: action.error ? action.payload.message : null
      };
    case actionTypes.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        waitUpdate: false,
        updateSuccess: true,
        updateErrors: null
      };
    case actionTypes.UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        waitUpdate: false,
        updateSuccess: false,
        updateErrors: action.payload.message
      };
    default:
      return state;
  }
}

export default composeReducers(article, listReducer({
  request: actionTypes.FETCH_ARTICLES_REQUEST,
  success: actionTypes.FETCH_ARTICLES_SUCCESS,
  failure: actionTypes.FETCH_ARTICLES_FAILURE
}));

