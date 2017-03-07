import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { defaultAfterLogin } from 'src/config';
import { fetchToken, saveToken, removeToken } from 'services/auth';

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
          const next = location.query.next || defaultAfterLogin;
          dispatch({ type: 'saveNextPath', payload: next });
        }
      });
    }
  },

  effects: {
    *login({ payload: { nickname, password } }, { call, select }) {
      try {
        const response = yield call(fetchToken, nickname, password);
        yield call(saveToken, response);
        const nextPath = yield select(state => state.auth.nextPath);
        notification.success({
          message: '登录成功',
          description: `3秒后跳转到 ${nextPath}`,
          duration: 3
        });
        window.location.href = nextPath;
      } catch (err) {
        console.error(err);
        notification.error({
          message: '登录失败',
          description: `错误 ${err.message}`,
        });
      }
    },
    *logout(action, { call, put }) {
      yield call(removeToken);
      yield put(routerRedux.push('/auth/login'));
    }
  },
  reducers: {
    saveNextPath(state, { payload }) {
      return { ...state, nextPath: payload };
    }
  }
};
