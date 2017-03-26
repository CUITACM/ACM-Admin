import { extractParams } from 'utils/qs';
import { message } from 'antd';
import {
  fetchWorkers
} from 'services/spider';

export const WorkerStatus = {
  STOP: 0,
  RUNNING: 1
};

export default {
  namespace: 'spiderWorker',
  state: {
    list: [],
    totalCount: 0,
    sortOrder: 'ascend',
    sortField: 'id'
  },
  subscriptions: {
    listSubscription({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/spiders/workers') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    },
  },
  effects: {
    *fetchList({ payload }, { put, call }) {
      const response = yield call(fetchWorkers);
      yield put({ type: 'saveList', payload: response });
    }
  },
  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...extractParams(payload) };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload.items
      };
    }
  }
};
