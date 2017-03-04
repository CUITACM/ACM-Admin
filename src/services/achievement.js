import request, { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchAchievements(page, per, params = {}) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/achievements`, query));
}

export function fetchAchievement(id) {
  return request(`${API_ROOT}/achievements/${id}`);
}

export function createAchievement(params) {
  return requestWithToken(`${API_ROOT}/achievements`, {
    method: 'POST', body: JSON.stringify(params),
  }, true);
}

export function updateArticle(id, params) {
  return requestWithToken(`${API_ROOT}/achievements/${id}`, {
    method: 'PUT', body: JSON.stringify(params),
  }, true);
}

export function deleteArticle(id) {
  return requestWithToken(`${API_ROOT}/achievements/${id}`, {
    method: 'DELETE'
  });
}
