import { fetchArticles, deleteArticle } from 'services/article';

export const ArticleType = {
  NEWS: 'News',
  SOLUTION: 'Solution'
};

export const ArticleStatus = {
  RECYCLE: 0,
  DRAFT: 1,
  PUBLISH: 2,
  PINNED: 3
};

const extractParams = query => {
  const {
    page = 1, search = '', sortField = 'id', sortOrder = 'ascend',
  } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
};

export default {
  namespace: 'article',
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
    listSubscriber({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/articles') {
          dispatch({ type: 'saveParams', payload: query });
          dispatch({ type: 'fetchList', payload: query });
        }
      });
    }
  },
  effects: {
    *fetchList({ payload }, { put, call, select }) {
      const params = extractParams(payload);
      const per = yield select(state => state.article.per);
      const response = yield call(fetchArticles, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: params.filters,
      });
      yield put({ type: 'saveList', payload: response });
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteArticle, payload);
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
    deleteSuccess(state, { payload }) {
      return { ...state, list: state.list.filter(user => user.id !== payload) };
    }
  }
};
