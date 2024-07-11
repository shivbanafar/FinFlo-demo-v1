// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from './logo.png'; // Adjust the path as necessary

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      console.log(response.data);
      // Handle successful login here (e.g., redirect to dashboard)
    } catch (error) {
      console.error('There was an error logging in!', error);
      // Handle login error here (e.g., display error message)
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <img src={logo} alt="FinFlo Logo" className="logo" />
        <h2>FinFlo</h2>
        <p className="tagline">Secure.Plan.Prosper.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">
              <i className="fas fa-envelope"></i>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Customer ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signup">Don't have an account? <a href="/signup">Create account.</a></p>
      </div>
    </div>
  );
};

export default Login;
