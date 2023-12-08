const initialState = {
    isLoggedIn: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false
        };  
      default:
        return state;
    }
  };
  
  export default authReducer;
  