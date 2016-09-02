import * as actionTypes from 'constants/actionTypes';

const initState = {
  data: [],
  pageSize: 20,
  pagination: {
    current_page: 1
  },
  waitFetch: false,
  fetchErrors: null
};

export default function article(state = initState, action) {
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
        data: action.payload.users,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    default:
      return state;
  }
}
