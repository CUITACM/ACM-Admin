import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchArticles(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(withParams(`${API_ROOT}/articles`, query));
}

export function deleteArticle(id) {
  return requestWithToken(`${API_ROOT}/articles/${id}`, {
    method: 'DELETE'
  });
}
