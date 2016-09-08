// api root
export const API_ROOT = 'http://localhost:3000';

// http method
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const LOGIN = {
  endpoint: `${API_ROOT}/sessions/login`,
  method: HttpMethod.POST
};

export const REGISTER = {
  endpoint: `${API_ROOT}/sessions/register`,
  method: HttpMethod.POST
};

export const FETCH_USERS = {
  endpoint: `${API_ROOT}/api/v1/users`,
  method: HttpMethod.GET
};

export const FETCH_ONE_USER = {
  endpoint: (id) => `${API_ROOT}/api/v1/users/${id}`,
  method: HttpMethod.GET
};

export const UPDATE_USER = {
  endpoint: (id) => `${API_ROOT}/api/v1/users/${id}`,
  method: HttpMethod.POST
};

export const FETCH_ARTICLES = {
  endpoint: `${API_ROOT}/api/v1/articles`,
  method: HttpMethod.GET
};
