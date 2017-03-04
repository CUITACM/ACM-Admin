import pathToRegexp from 'path-to-regexp';
import { extractParams } from 'utils/qs';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchAchievements, fetchAchievement, createAchievement
} from 'services/achievement';

export const AchievementType = {
  AMOUNT: 'amount',
  SUBJECT: 'subject',
  CONTINUOUS: 'continuous'
};

export const HumanAchievementType = {
  amount: '数量级成就',
  subject: '专题成就',
  // continuous: '坚持成就'
};

export const HumanAmountType = {
  accepted: 'Accepted数量',
  blog: '发表解题报告',
  comment: '评论数',
  like: '点赞数',
  cf_rating: 'Codeforces的Rating'
};

export default {
  namespace: 'achievement',
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
        if (pathname === '/admin/achievements/list') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    },
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin/achievements/edit/:id').exec(pathname);
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
      const response = yield call(fetchAchievements, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: params.filters,
      });
      yield put({ type: 'saveList', payload: response });
    },
    *fetchItem({ payload: id }, { put, call }) {
      const response = yield call(fetchAchievement, id);
      yield put({ type: 'saveItem', payload: response.achievement });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createAchievement, payload.params);
      if (response.achievement) {
        message.success('创建成功');
        if (payload.goback) {
          yield put(routerRedux.goBack());
        }
      } else {
        message.error('创建失败');
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
