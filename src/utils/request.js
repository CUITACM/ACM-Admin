import fetch from 'dva/fetch';
import { getToken } from 'services/auth';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options = {}) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function requestWithToken(url, options = {}) {
  const newOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${getToken()}`,
    }
  };
  return request(url, newOptions);
}
