import request, { requestWithToken } from 'utils/request';
import { withParams } from 'utils/qs';
import { API_ROOT } from 'src/config';

export function fetchHonors(page, per, params = {}) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/honors`, query));
}

export function createHonor(params) {
  return requestWithToken(`${API_ROOT}/honors`, {
    method: 'POST', body: JSON.stringify(params),
  }, true);
}

export function updateHonor(id, params) {
  return requestWithToken(`${API_ROOT}/honors`, {
    method: 'PUT', body: JSON.stringify(params),
  }, true);
}

export function deleteHonor(id) {
  return requestWithToken(`${API_ROOT}/honors/${id}`, {
    method: 'DELETE'
  });
}

