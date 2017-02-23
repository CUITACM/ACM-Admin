import { extractParams } from 'utils/qs';
import { message } from 'antd';
import {
  fetchAccounts, createAcount, updateAccount, deleteAccount
} from 'services/spider';

export const AccountStatus = {
  NOT_INIT: 0,
  NORMAL: 1,
  QUEUE: 2,
  UPDATING: 3,
  UPDATE_ERROR: 4,
  ACCOUNT_ERROR: 5,
  STOP: 100
};

export const OJ_MAP = {
  hdu: 'HDU',
  bnu: 'BNU',
  poj: 'POJ',
  vj: 'Hust Vjudge',
  cf: 'Codeforces',
  bc: 'Bestcoder'
};

export default {
  namespace: 'account',
  state: {
    list: [],
    page: 1,
    per: 10,
    totalCount: 0,
    totalPages: 0,
    search: '',
    sortOrder: 'ascend',
    sortField: 'id',
    filters: {}
  },
  subscriptions: {
    listSubscription({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/spiders/accounts') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    },
  },
  effects: {
    *fetchList({ payload }, { put, call, select }) {
      const params = extractParams(payload);
      const per = yield select(state => state.account.per);
      const response = yield call(fetchAccounts, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: params.filters,
      });
      yield put({ type: 'saveList', payload: response });
    },
    *update({ payload, callback }, { put, call }) {
      const response = yield call(updateAccount, payload.id, payload.params);
      if (response.error_code !== 1 && response.account != null) {
        message.success('修改成功');
        if (callback) callback();
        yield put({ type: 'updateSuccess', payload: response.account });
      } else {
        message.error('修改失败');
      }
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteAccount, payload);
      console.log(response);
      if (response.error_code === 0) {
        message.success('删除成功');
        yield put({ type: 'deleteSuccess', payload });
      } else {
        message.success('删除失败');
      }
    },
  },
  reducers: {
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
    updateSuccess(state, { payload }) {
      return {
        ...state,
        list: state.list.map(account => (account.id !== payload.id ? account : payload)),
      };
    },
    deleteSuccess(state, { payload }) {
      return { ...state, list: state.list.filter(account => account.id !== payload) };
    },
  }
};
