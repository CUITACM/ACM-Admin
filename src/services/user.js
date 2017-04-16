import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams, toFormData } from 'utils/qs';

export function fetchUsers(page, per, params = {}) {
  const query = { page, per, ...params };
  return requestWithToken(withParams(`${API_ROOT}/users`, query));
}

export function fetchUser(id) {
  return requestWithToken(`${API_ROOT}/users/${id}`);
}

export function createUser(params) {
  return requestWithToken(`${API_ROOT}/users`, {
    method: 'POST', body: JSON.stringify(params),
  });
}

export function updateUser(id, params) {
  const data = toFormData(params);
  console.log(data);
  return requestWithToken(`${API_ROOT}/users/${id}`, {
    method: 'POST', body: data,
  });
}

export function deleteUser(id) {
  return requestWithToken(`${API_ROOT}/users/${id}`, {
    method: 'DELETE'
  });
}
