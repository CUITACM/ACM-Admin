import * as actionTypes from 'constants/actionTypes';

const initState = {
  one: null,
  datas: [],
  pageSize: 10,
  pagination: {
    current_page: 1
  },
  waitFetch: false,
  fetchErrors: null
};

export default function user(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        pagination: action.payload.meta,
        datas: action.payload.users,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    case actionTypes.FETCH_ONE_USER_REQUEST:
      return {
        ...state,
        waitFetch: !action.error,
        fetchErrors: action.error ? action.payload.message : null
      };
    case actionTypes.FETCH_ONE_USER_SUCCESS:
      return {
        ...state,
        one: action.payload.user,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_ONE_USER_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    default:
      return state;
  }
}
