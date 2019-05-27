const initialState = {
  isLoggedIn: false,
  isLoginFailed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoginFailed: true,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
