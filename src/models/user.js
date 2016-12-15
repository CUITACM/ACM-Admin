import jwtDecode from 'jwt-decode';
import pathToRegexp from 'path-to-regexp';
import { getToken } from 'services/auth';
import * as userServices from 'services/user';

const extractParams = query => {
  const { page = 1, search = '', sortField = 'id', sortOrder = 'ascend' } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
};

export default {
  namespace: 'user',
  state: {
    currentUser: null,
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
        if (pathname === '/admin/users') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    }
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
        const response = yield call(userServices.fetchUser, decoded.user_id);
        yield put({ type: 'loadCurrentUserSuccess', payload: response });
      } catch (err) {
        console.error(err);
        yield put({ type: 'loadCurrentUserFail' });
      }
    },
    *fetchList({ payload }, { put, call, select }) {
      const params = extractParams(payload);
      const per = yield select(state => state.user.per);
      const response = yield call(userServices.fetchUsers, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: params.filters,
      });
      yield put({ type: 'saveList', payload: response });
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
    }
  }
};
