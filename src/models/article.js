import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  fetchArticles, fetchArticle, createArticle, updateArticle, deleteArticle
} from 'services/article';

export const ArticleType = {
  NEWS: 'News',
  SOLUTION: 'Solution'
};

export const HumanArticleType = {
  News: '新闻',
  Solution: '解题报告'
};

export const ArticleStatus = {
  RECYCLE: 0,
  DRAFT: 1,
  PUBLISH: 2,
  PINNED: 3
};

const extractParams = query => {
  const { page = 1, search = '', sortField = 'created_at', sortOrder = 'descend' } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
};

const mapToArticleType = (type) => {
  switch (type) {
    case 'news':
      return ArticleType.NEWS;
    case 'solution':
      return ArticleType.SOLUTION;
    default:
      throw new Error('未知的文章类型');
  }
};

export default {
  namespace: 'article',
  state: {
    currentItem: {},
    list: [],
    type: null,
    page: 1,
    per: 10,
    totalCount: 0,
    totalPages: 0,
    search: '',
    sortOrder: 'descend',
    sortField: 'id',
    filters: {}
  },
  subscriptions: {
    listSubscriber({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/admin/articles/:type').exec(pathname);
        if (match) {
          const type = match[1];
          dispatch({ type: 'saveParams', payload: { query, type } });
          dispatch({ type: 'fetchList', payload: { query, type } });
        }
      });
    },
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/admin/articles/edit/:id').exec(pathname);
        if (match) {
          const id = match[1];
          dispatch({ type: 'fetchItem', payload: id });
        }
      });
    },
  },
  effects: {
    *fetchList({ payload: { query, type } }, { put, call, select }) {
      const params = extractParams(query);
      const per = yield select(state => state.article.per);
      const response = yield call(fetchArticles, params.page, per, {
        search: params.search,
        sort_field: params.sortField,
        sort_order: params.sortOrder,
        filters: {
          ...params.filters,
          article_type: mapToArticleType(type)
        },
      });
      yield put({ type: 'saveList', payload: response });
    },
    *fetchItem({ payload: id }, { put, call }) {
      const response = yield call(fetchArticle, id);
      yield put({ type: 'saveItem', payload: response.article });
    },
    *create({ payload }, { put, call }) {
      const response = yield call(createArticle, payload.params);
      if (response && response.article != null) {
        message.success('创建成功');
        if (payload.goback) {
          yield put(routerRedux.goBack());
        }
      } else {
        message.error('创建失败');
      }
    },
    *update({ payload }, { put, call }) {
      const response = yield call(updateArticle, payload.id, payload.params);
      if (response.article != null) {
        message.success('更新成功');
        if (payload.goback) {
          yield put(routerRedux.goBack());
        }
      } else {
        message.error('更新失败');
      }
    },
    *delete({ payload }, { put, call }) {
      const response = yield call(deleteArticle, payload);
      console.log(response);
      if (response.error_code === 0) {
        message.success('删除成功');
        yield put({ type: 'deleteSuccess', payload });
      } else {
        message.success('删除失败');
      }
    },
    *changeStatus({ payload }, { put, call }) {
      const response = yield call(updateArticle, payload.id, payload.params);
      if (response.error_code !== 1 && response.article != null) {
        message.success('修改成功');
        yield put({ type: 'updateSuccess', payload: response.article });
      } else {
        message.error('修改失败');
      }
    }
  },
  reducers: {
    saveParams(state, { payload: { query, type } }) {
      return { ...state, ...extractParams(query), type };
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
    deleteSuccess(state, { payload }) {
      return { ...state, list: state.list.filter(article => article.id !== payload) };
    },
    updateSuccess(state, { payload }) {
      return {
        ...state,
        list: state.list.map(article => (article.id !== payload.id ? article : payload))
      };
    }
  }
};
