
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

function decodeParams(parameters, prefix) {
  const kvs = [];
  const inArray = isArray(parameters);
  Object.keys(parameters).forEach((k) => {
    const key = k.trim();
    const value = parameters[key];
    if (key !== '' && value !== '') {
      let nextKey;
      if (inArray) {
        nextKey = prefix ? `${prefix}[]` : key;
      } else {
        nextKey = prefix ? `${prefix}[${key}]` : key;
      }
      kvs.push(isObject(value) || isArray(value) ?
        decodeParams(value, nextKey) : `${esc(nextKey)}=${esc(value)}`
      );
    }
  });
  return kvs.join('&');
}

export function withParams(url, parameters = {}) {
  const queryString = decodeParams(parameters);
  let ret = url;
  if (queryString.length > 0) {
    ret += `?${queryString}`;
  }
  return ret;
}

export function extractParams(query) {
  const { page = 1, search = '', sortField = 'id', sortOrder = 'ascend' } = query;
  const filters = JSON.parse(query.filters || '{}');
  return { page: parseInt(page, 10), search, sortField, sortOrder, filters };
}
