import pathToRegexp from 'path-to-regexp';
import { fetchResources, deleteResource } from 'services/resource';

export const ResourceUsage = {
  ARTICLE: 'article',
  HONOR: 'honor',
  COVER: 'cover',
  OTHER: 'other'
};

export const ResourceUsageHuman = {
  article: '文章',
  honor: '荣誉墙',
  cover: '首页封面',
  other: '其它'
};

const extractParams = query => {
  const {
    page = 1, search = '', sortField = 'id', sortOrder = 'ascend',
  } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
};

export default {
  namespace: 'resource',
  state: {
    currentItem: {},
    list: [],
    page: 1,
    per: 12,
    totalCount: 0,
    totalPages: 0,
    search: '',
    sortOrder: 'ascend',
    sortField: 'id',
    filters: {}
  },
  subscriptions: {
    listSubscriber({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/resources') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    },
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin/resources/:id').exec(pathname);
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
      const per = yield select(state => state.resource.per);
      const response = yield call(fetchResources, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: params.filters,
      });
      yield put({ type: 'saveList', payload: response });
    },
    *fethItem({ payload: id }, { put, call }) {
      // yield call()
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteResource, payload);
      console.log(response);
      if (response.error_code === 0) {
        yield put({ type: 'deleteSuccess', payload });
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
    createSuccess(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },
    deleteSuccess(state, { payload }) {
      return { ...state, list: state.list.filter(res => res.id !== payload) };
    }
  }
};
