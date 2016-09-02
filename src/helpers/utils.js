export function type(obj) {
  return obj == null ? String(obj) : toString.call(obj) || 'object';
}

export function isArray(obj) {
  return type(obj) === '[object Array]';
}

export function isFunction(obj) {
  return type(obj) === '[object Function]';
}

export function isObject(obj) {
  return type(obj) === '[object Object]';
}

const esc = window.encodeURIComponent;

export function withParams(url, parameters) {
  const queryString = Object.keys(parameters).map(key => {
    const value = parameters[key];
    if (isObject(value)) {
      return Object.keys(value).map(k => (
        `${esc(`${key}[${k}]`)}=${esc(value[k])}`
      )).join('&');
    } else if (isArray(value)) {
      return value.map(v => (
        `${esc(`${key}[]`)}=${esc(v)}`
      )).join('&');
    }
    return `${esc(key)}=${esc(value)}`;
  }).join('&');
  let ret = url;
  if (queryString.length > 0) {
    ret += `?${queryString}`;
  }
  return ret;
}
