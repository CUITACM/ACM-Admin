import jwtDecode from 'jwt-decode';
import pathToRegexp from 'path-to-regexp';
import { getToken } from 'services/auth';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchUsers, fetchUser, createUser, updateUser, deleteUser
} from 'services/user';

export const UserRole = {
  STUDENT: 1,
  COACH: 2,
  ADMIN: 4
};

export const UserStatus = {
  REJECT: -1,
  APPLY: 0,
  TRAIN: 1,
  RETIRE: 2
};

const extractParams = query => {
  const { page = 1, search = '', sortField = 'role', sortOrder = 'descend' } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
};

export default {
  namespace: 'user',
  state: {
    currentUser: null,
    currentItem: {
      user_info: {}
    },
    list: [],
    page: 1,
    per: 10,
    totalCount: 0,
    totalPages: 0,
    search: '',
    sortOrder: 'ascend',
    sortField: 'id',
    filters: {},
  },
  subscriptions: {
    currentUserSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin*').exec(pathname);
        if (match) {
          dispatch({ type: 'loadCurrentUser' });
        }
      });
    },
    listSubscriber({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/users/list') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchNormalList', payload: query });
        }
        if (pathname === '/admin/users/newcomers') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchNewComers', payload: query });
        }
      });
    },
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin/users/edit/:id').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetchItem', payload: id });
        }
      });
    },
  },
  effects: {
    *loadCurrentUser(action, { call, put, select }) {
      try {
        const alreadyUser = yield select(state => state.user.currentUser);
        if (alreadyUser != null) {
          yield put({ type: 'loadCurrentUserSuccess', payload: { user: alreadyUser } });
          return;
        }
        const token = yield call(getToken);
        const decoded = jwtDecode(token);
        if (!decoded) {
          console.log(decoded);
          throw new Error('invalid jwt token');
        }
        const response = yield call(fetchUser, decoded.user_id);
        yield put({ type: 'loadCurrentUserSuccess', payload: response });
      } catch (err) {
        console.error(err);
        yield put({ type: 'loadCurrentUserFail' });
      }
    },
    *fetchNormalList({ payload }, { put, call, select }) {
      const params = extractParams(payload);
      const per = yield select(state => state.user.per);
      const response = yield call(fetchUsers, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: {
          ...params.filters,
          status: [UserStatus.TRAIN, UserStatus.RETIRE]
        },
      });
      yield put({ type: 'saveList', payload: response });
    },
    *fetchNewComers({ payload }, { put, call, select }) {
      const params = extractParams(payload);
      const per = yield select(state => state.user.per);
      const response = yield call(fetchUsers, params.page, per, {
        search: params.search,
        sort_field: 'status',
        sort_order: 'descend',
        filters: {
          ...params.filters,
          status: [UserStatus.REJECT, UserStatus.APPLY]
        },
      });
      yield put({ type: 'saveList', payload: response });
    },
    *fetchItem({ payload: id }, { put, call }) {
      const response = yield call(fetchUser, id);
      yield put({ type: 'saveItem', payload: response.user });
    },
    *update({ payload }, { put, call }) {
      const response = yield call(updateUser, payload.id, payload.params);
      if (response.user != null) {
        yield put(routerRedux.goBack());
      } else {
        message.error('更新失败');
      }
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteUser, payload.id);
      if (response.error_code === 0) {
        message.success('删除成功');
        yield put(routerRedux.replace(payload.redirect));
      } else {
        message.error('删除失败');
      }
    }
  },
  reducers: {
    loadCurrentUserSuccess(state, { payload }) {
      return { ...state, currentUser: payload.user };
    },
    saveParams(state, { payload }) {
      return { ...state, ...extractParams(payload) };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload.items,
        page: payload.meta.current_page,
        totalCount: payload.meta.total_count,
        totalPages: payload.meta.total_pages,
      };
    },
    saveItem(state, { payload }) {
      return { ...state, currentItem: payload };
    }
  }
};
