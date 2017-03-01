import {
  fetchDashboard
} from 'services/misc';

export default {
  namespace: 'misc',
  state: {
    dashboard: {},
  },
  subscriptions: {
    listSubscription({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/main/dashboard') {
          dispatch({ type: 'fetchDashboard' });
        }
      });
    },
  },
  effects: {
    *fetchDashboard({ payload }, { put, call }) {
      const response = yield call(fetchDashboard);
      yield put({ type: 'saveDashboard', payload: response });
    }
  },
  reducers: {
    saveDashboard(state, { payload }) {
      return { ...state, dashboard: payload.data };
    }
  }
};
