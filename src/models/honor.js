import pathToRegexp from 'path-to-regexp';
import { extractParams } from 'utils/qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchHonors, fetchHonor, createHonor, updateHonor
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
    currentItem: {},
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
        if (pathname === '/admin/honors/list') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    },
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin/honors/edit/:id').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetchItem', payload: id });
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
    *fetchItem({ payload: id }, { put, call }) {
      const response = yield call(fetchHonor, id);
      yield put({ type: 'saveItem', payload: response.honor });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createHonor, payload.params, payload.images);
      if (response.honor != null) {
        message.success('创建成功');
        if (payload.goback) {
          yield put(routerRedux.goBack());
        }
      } else {
        message.error('创建失败');
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateHonor, payload.id, payload.params, payload.images);
      if (response.honor != null) {
        message.success('更新成功');
        if (payload.goback) {
          yield put(routerRedux.goBack());
        }
      } else {
        message.error('更新失败');
      }
    }
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
    saveItem(state, { payload }) {
      return { ...state, currentItem: payload };
    },
  }
};
