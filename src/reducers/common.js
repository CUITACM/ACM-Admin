
export function listReducer(actionTypes) {
  return (state, action) => {
    switch (action.type) {
      case actionTypes.request:
        return {
          ...state,
          waitFetch: !action.error,
          fetchErrors: action.error ? action.payload.message : null
        };
      case actionTypes.success:
        return {
          ...state,
          pagination: action.payload.meta,
          datas: action.payload.items,
          waitFetch: false,
          fetchErrors: null
        };
      case actionTypes.failure:
        return {
          ...state,
          waitFetch: false,
          fetchErrors: action.payload.message
        };
      default:
        return state;
    }
  };
}
