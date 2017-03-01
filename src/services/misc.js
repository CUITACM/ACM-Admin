import request from 'utils/request';
import { API_ROOT } from 'src/config';

export function fetchDashboard() {
  return request(`${API_ROOT}/misc/dashboard`);
}
