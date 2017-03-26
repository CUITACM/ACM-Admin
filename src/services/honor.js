import request, { requestWithToken } from 'utils/request';
import { withParams, toFormData } from 'utils/qs';
import { API_ROOT } from 'src/config';

export function fetchHonors(page, per, params = {}) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/honors`, query));
}

export function fetchHonor(id) {
  return request(`${API_ROOT}/honors/${id}`);
}

export function createHonor(params, images) {
  const data = toFormData(params);
  if (images) {
    images.forEach(image => data.append('images[]', image));
  }
  return requestWithToken(`${API_ROOT}/honors`, {
    method: 'POST', body: data,
  });
}

export function updateHonor(id, params, images) {
  const data = toFormData(params);
  if (images) {
    images.forEach(image => data.append('images[]', image));
  }
  return requestWithToken(`${API_ROOT}/honors/${id}`, {
    method: 'POST', body: data,
  });
}

export function deleteHonor(id) {
  return requestWithToken(`${API_ROOT}/honors/${id}`, {
    method: 'DELETE'
  });
}

