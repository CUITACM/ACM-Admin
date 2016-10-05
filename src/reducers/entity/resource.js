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

function resource(state = initState, action) {
  switch (action.type) {
    // fetch one resource
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
    // create resource
    // update resource
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

export default composeReducers(resource, listReducer({
  request: actionTypes.FETCH_RESOURCES_REQUEST,
  success: actionTypes.FETCH_RESOURCES_SUCCESS,
  failure: actionTypes.FETCH_RESOURCES_FAILURE
}));
