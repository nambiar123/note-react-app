import React, { useState } from 'react';
import './login.css'; // Import your CSS file
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../actions/authActions'
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
    const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true); // State to manage which form to display
  const [mobileNumber, setMobileNumber] = useState(''); // Additional field for signup
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const loginUser = async () => {
    try {
      const response = await fetch(baseUrl+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful, call the onLogin function
       // onLogin(true); // Set login status to true
      ////  console.log('Login successful');
        //localStorage.setItem("login", true);
        dispatch(loginSuccess());
      } else {
        // Authentication failed, display an error message or handle accordingly
       // console.error('Login failed');
        //localStorage.setItem("login", false);
        dispatch(loginFailure());
        Swal.fire({
          icon: 'error',
          title: 'Incorrect',
          text: 'Incorrect username/ password!',
        });
      }
    } catch (error) {
      // Handle network errors or other issues with the API call
      console.error('Error:', error);
    }
  };

  const signupUser = async () => {
    const response = await fetch(baseUrl +'/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, mobileNumber }),
    });
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully signed up!',
    });
    dispatch(loginFailure());
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // Pass the entered credentials to the onLogin function
    onLogin({ username, password });

    if (showLogin) {
        loginUser();
      } else {
        signupUser();
      }
    
  };

  return (
    <div className="login-container">
      <h2>{showLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!showLogin && ( // Conditionally render the email field for signup form only
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              id="mobileNumber"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
        )}
        <div className="input-group">
          <button type="submit">{showLogin ? 'Login' : 'Sign Up'}</button>
        </div>
        <div className="input-group">
          <button type="button" onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
