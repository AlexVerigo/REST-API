export const loginUser = (login, password) => {
  if (login === 'Admin' && password === 'Admin') {
    window.localStorage.setItem('login', login);
    window.localStorage.setItem('password', password);
    return { type: 'LOGIN' };
  }
  return { type: 'LOGIN_ERROR' };
};
