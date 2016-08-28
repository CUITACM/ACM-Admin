import * as actionTypes from '../constants/actionTypes';

const initState = {
  currentUser: null,
  waitLoginIn: false,
  waitLoginOut: false,
  loginErrors: null
};

export default function auth(state = initState, action) {
  console.log(action.payload)
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        waitLoginIn: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        waitLoginIn: false,
        loginErrors: null
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        waitLoginIn: false,
        loginErrors: action.payload.message
      };
    default:
      return state;
  }
}