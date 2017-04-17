import { extractParams } from 'utils/qs';
import { message } from 'antd';
import { fetchWorkers, openWorker, closeWorker } from 'services/spider';

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
    },
    *open({ payload }, { select, put, call }) {
      const response = yield call(openWorker, payload.oj);
      if (response.error === 0) {
        message.success('已开启');
        const workerList = yield select(state => state.spiderWorker.list);
        yield put({ type: 'saveList', payload: { items: [...workerList, payload.oj] } });
      } else {
        message.error('出错啦~');
      }
    },
    *close({ payload }, { select, put, call }) {
      const response = yield call(closeWorker, payload.oj);
      if (response.error === 0) {
        message.success('已关闭');
        const workerList = yield select(state => state.spiderWorker.list);
        const pos = workerList.findIndex((oj) => oj === payload.oj);
        if (pos !== -1) {
          const newList = [...workerList.slice(0, pos), ...workerList.slice(pos + 1)];
          yield put({ type: 'saveList', payload: { items: newList } });
        }
      } else {
        message.error('出错啦~');
      }
    }
  },
  reducers: {
    saveParams(state, { payload }) {
      return { ...state, ...extractParams(payload) };
    },
    saveList(state, { payload }) {
      return { ...state, list: payload.items };
    }
  }
};
