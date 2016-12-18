import request, { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchAccounts(page, per, params) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/spiders/accounts`, query));
}

export function createAccount(params) {
  return requestWithToken(`${API_ROOT}/spiders/accounts`, {
    method: 'POST', body: JSON.stringify(params),
  });
}

export function fetchSubmits(page, per, params) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/spiders/submits`, query));
}

export function fetchWorkers() {
  return requestWithToken(withParams(`${API_ROOT}/spiders/workers`, query));
}
