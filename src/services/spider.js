import { requestWithToken } from 'utils/request';
import { API_ROOT } from 'src/config';
import { withParams } from 'utils/qs';

export function fetchAccounts(page, per, params) {
  const query = { page, per, ...params };
  requestWithToken(withParams(`${API_ROOT}/accounts`, query));
}

export function createAccount(params) {
  requestWithToken(`${API_ROOT}/accounts`, {
    method: 'POST', body: JSON.stringify(params),
  });
}

export function fetchSubmits(page, per, params) {
  const query = { page, per, ...params };
  requestWithToken(withParams(`${API_ROOT}/submits`, query));
}
