import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Additional fields for signup form

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., send data to the server)
    // This is just a simple example, replace it with your actual signup functionality
    console.log('Signing up:', { username, password });
    // Add your logic here to sign up the user
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Input fields */}
        <div className="input-group">
          <label htmlFor="signup-username">Username:</label>
          <input
            id="signup-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="signup-password">Password:</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Additional fields for signup form */}
        <div className="input-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
