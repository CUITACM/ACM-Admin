import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import qs from 'qs';

export function fetchArticles(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(`${API_ROOT}/articles?${qs.stringify(query)}`);
}
