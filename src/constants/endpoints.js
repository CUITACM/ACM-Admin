// api root
const API_ROOT = 'http://192.168.40.187:3000';

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
