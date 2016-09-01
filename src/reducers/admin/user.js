import * as actionTypes from 'constants/actionTypes';

const initState = {
  data: [],
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
        data: action.payload.users,
        waitFetch: false,
        fetchErrors: null
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        data: [],
        waitFetch: false,
        fetchErrors: action.payload.message
      };
    default:
      return state;
  }
}
