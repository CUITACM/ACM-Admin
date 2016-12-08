export function saveObject(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function takeObject(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function save(key, value) {
  window.localStorage.setItem(key, value);
}

export function take(key) {
  return window.localStorage.getItem(key);
}

export function remove(key) {
  window.localStorage.removeItem(key);
}