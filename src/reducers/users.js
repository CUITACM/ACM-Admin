import * as actionTypes from 'constants/actionTypes';

const initState = {
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_REQUEST:
      return {
        ...state
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
