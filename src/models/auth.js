import { fetchToken, saveToken, removeToken } from 'services/auth';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'auth',
  state: {
    nextPath: '',
    hasLogin: false,
    loginErrors: null,
  },

  subscriptions: {
    loginSubscriber({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/auth/login') {
          const next = location.query.next || '/admin';
          dispatch({ type: 'saveNextPath', payload: location.query });
        }
      });
    }
  },

  effects: {
    *login({ payload: { nickname, password } }, { call, put }) {
      yield put({ type: 'loginStart' });
      try {
        const response = yield call(fetchToken, nickname, password);
        yield call(saveToken, response);
        yield put({ type: 'loginSuccess' });
      } catch (err) {
        console.error(err);
        yield put({ type: 'loginFail', payload: err.message });
      }
    },
    *logout(action, { call, put }) {
      yield call(removeToken);
      yield put(routerRedux.push('/auth/login'));
    }
  },
  reducers: {
    saveNextPath(state, { payload }) {
      return { ...state, nextPath: payload.next };
    },
    loginStart(state) {
      return { ...state, hasLogin: false, loginErrors: null };
    },
    loginSuccess(state) {
      return { ...state, hasLogin: true, loginErrors: null };
    },
    loginFail(state, { payload }) {
      return { ...state, hasLogin: false, loginErrors: payload };
    }
  }
};
