export const login = () => {
    return {
      type: 'LOGIN'
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT'
    };
  };
  
  export const loginSuccess = () => {
    return {
      type: 'LOGIN_SUCCESS'
    };
  };
  
  export const loginFailure = () => {
    return {
      type: 'LOGIN_FAILURE'
    };
  };
  