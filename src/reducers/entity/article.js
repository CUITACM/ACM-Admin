import * as actionTypes from 'constants/actionTypes';

const initState = {
  one: null,
  data: [],
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
  updateErrors: null,
  waitDelete: false,
  deleteSuccess: false,
  deleteErrors: null
};

export default function article(state = initState, action) {
  switch (action.type) {
    // FETCH_ARTICLES
    case actionTypes.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        pagination: action.payload.meta,
        data: action.payload.articles,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    // FETCH_ONE_ARTICLE
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
    // CREATE_ARTICLE
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
    // UPDATE_ARTICLE
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
    case actionTypes.DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        waitDelete: !action.error,
        deleteSuccess: false,
        deleteErrors: action.error ? action.payload.message : null
      };
    case actionTypes.DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        waitDelete: false,
        deleteSuccess: true,
        deleteErrors: null
      };
    case actionTypes.DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        waitDelete: false,
        deleteSuccess: false,
        deleteErrors: action.payload.message
      };
    default:
      return state;
  }
}
