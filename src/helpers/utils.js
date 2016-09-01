
const esc = window.encodeURIComponent;

export function withParams(url, parameters) {
  const queryString = Object.keys(parameters).map(k => (
    `${esc(k)}=${esc(parameters[k])}`
  )).join('&');
  let ret = url;
  if (queryString.length > 0) {
    ret += `?${queryString}`;
  }
  return ret;
}
