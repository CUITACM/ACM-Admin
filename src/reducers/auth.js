import * as actionTypes from 'constants/actionTypes';

const initState = {
  currentUser: null,
  waitLoginIn: false,
  loginSuccess: false,
  loginErrors: null,
  waitRegister: false,
  registerSuccess: false,
  registerErrors: null,
  logoutSuccess: false
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginSuccess: false,
        waitLoginIn: !action.error,
        loginErrors: action.error ? action.payload.message : null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        loginSuccess: true,
        waitLoginIn: false,
        loginErrors: null,
        logoutSuccess: false
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loginSuccess: false,
        waitLoginIn: false,
        loginErrors: action.payload.message
      };
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        registerSuccess: false,
        waitRegister: !action.error,
        registerErrors: action.error ? action.payload.message : null
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        waitRegister: false,
        registerErrors: null
      };
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        registerSuccess: false,
        waitRegister: false,
        registerErrors: action.payload.message
      };
    case actionTypes.LOAD_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        logoutSuccess: true
      };
    default:
      return state;
  }
}
