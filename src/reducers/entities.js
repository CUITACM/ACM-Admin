import merge from 'lodash/merge';

const initState = {
  users: {},
};

export default function entities(state = initState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}
