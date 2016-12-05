import request from 'utils/request';

export async function fetch_token(username, password) {
  return request(`/api/v1/auth/token`);
}