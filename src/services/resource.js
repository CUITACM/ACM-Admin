import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchResources(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(withParams(`${API_ROOT}/resources`, query));
}

export function createResource(params) {
  const data = new FormData();
  Object.keys(params).forEach(key => { data.append(key, params[key]); });
  return requestWithToken(`${API_ROOT}/resources`, {
    method: 'POST', body: data
  });
}

export function deleteResource(id) {
  return requestWithToken(`${API_ROOT}/resources/${id}`, {
    method: 'DELETE'
  });
}
