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
  updateErrors: null
};

export default function resource(state = initState, action) {
  switch (action.type) {
    // FETCH_RESOURCES
    case actionTypes.FETCH_RESOURCES_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_RESOURCES_SUCCESS:
      return {
        ...state,
        pagination: action.payload.meta,
        data: action.payload.articles,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_RESOURCES_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    // FETCH_ONE_RESOURCE
    case actionTypes.FETCH_ONE_RESOURCE_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_ONE_RESOURCE_SUCCESS:
      return {
        ...state,
        one: action.payload.resource,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_ONE_RESOURCE_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    // CREATE_RESOURCE
    // UPDATE_RESOURCE
    case actionTypes.UPDATE_RESOURCE_REQUEST:
      return {
        ...state,
        waitUpdate: !action.error,
        updateSuccess: false,
        updateErrors: action.error ? action.payload.message : null
      };
    case actionTypes.UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        waitUpdate: false,
        updateSuccess: true,
        updateErrors: null
      };
    case actionTypes.UPDATE_RESOURCE_FAILURE:
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
