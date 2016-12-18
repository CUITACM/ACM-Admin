import { fetchAccounts } from 'services/spider';
import { extractParams } from 'utils/qs';

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
  }
};
