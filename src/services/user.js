import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import qs from 'qs';

export function fetchUsers(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(`${API_ROOT}/users?${qs.stringify(query)}`);
}

export function fetchUser(id) {
  return requestWithToken(`${API_ROOT}/users/${id}`);
}
