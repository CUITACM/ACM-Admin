
export function keepCurrentUser(currentUser) {
  window.localStorage.setItem('currentUser', currentUser);
}

export function takeCurrentUser() {
  window.localStorage.getItem('currentUser');
}
