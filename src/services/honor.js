import request, { requestWithToken } from 'utils/request';
import { withParams } from 'utils/qs';
import { API_ROOT } from 'src/config';

export function fetchHonors(page, per, params = {}) {
  const query = { page, per, ...params };
  return request(withParams(`${API_ROOT}/honors`, query));
}


