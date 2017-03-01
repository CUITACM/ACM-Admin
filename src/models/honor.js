import { extractParams } from 'utils/qs';
import { message } from 'antd';
import {
  fetchHonors
} from 'services/honor';

export const HonorLevel = {
  '100': '校赛三等奖',
  '101': '校赛二等奖',
  '102': '省赛三等奖',
  '200': '省赛三等奖',
  '201': '省赛二等奖',
  '202': '省赛一等奖',
  '300': '区域赛优胜奖',
  '301': '区域赛铜奖',
  '302': '区域赛银奖',
  '303': '区域赛金奖'
};

export default {
  namespace: 'honor',
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
        if (pathname === '/admin/honors') {
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
      const response = yield call(fetchHonors, params.page, per, {
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
    }
  }
};
