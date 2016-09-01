import { browserHistory } from 'react-router';

export default function errors(state = null, action) {
  const { error, paylod } = action;
  if (!error) return state;
  if (paylod && paylod.status) {
    switch (paylod) {
      case 401:
        browserHistory.replace('/login');
        break;
      default:
        break;
    }
  }
  return state;
}
