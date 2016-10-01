// api root
export const API_ROOT = 'http://localhost:3000';

// http method
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// auth
export const LOGIN = {
  endpoint: `${API_ROOT}/sessions/login`,
  method: HttpMethod.POST
};

export const REGISTER = {
  endpoint: `${API_ROOT}/sessions/register`,
  method: HttpMethod.POST
};

// users
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

// articles
export const FETCH_ARTICLES = {
  endpoint: `${API_ROOT}/api/v1/articles`,
  method: HttpMethod.GET
};

export const FETCH_ONE_ARTICLE = {
  endpoint: (id) => `${API_ROOT}/api/v1/articles/${id}`,
  method: HttpMethod.GET
};

export const CREATE_ARTICLE = {
  endpoint: `${API_ROOT}/api/v1/articles`,
  method: HttpMethod.POST
};

export const UPDATE_ARTICLE = {
  endpoint: (id) => `${API_ROOT}/api/v1/articles/${id}`,
  method: HttpMethod.PUT
};

export const DELETE_ARTICLE = {
  endpoint: (id) => `${API_ROOT}/api/v1/articles/${id}`,
  method: HttpMethod.DELETE
};

// resources
export const FETCH_RESOURCES = {
  endpoint: `${API_ROOT}/api/v1/resources`,
  method: HttpMethod.GET
};

export const FETCH_ONE_RESOURCE = {
  endpoint: (id) => `${API_ROOT}/api/v1/resources/${id}`,
  method: HttpMethod.GET
};

export const CREATE_RESOURCE = {
  endpoint: `${API_ROOT}/api/v1/resources`,
  method: HttpMethod.POST
};
