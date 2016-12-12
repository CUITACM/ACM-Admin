import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchUsers(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(withParams(`${API_ROOT}/users`, query));
}

export function fetchUser(id) {
  return requestWithToken(`${API_ROOT}/users/${id}`);
}
