import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/login', {
                username: username,
                password: password
            });
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                // Handle successful login (e.g., redirect to dashboard)
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="logo.svg" alt="Logo" className="login-logo" />
                <h2>FinFlo</h2>
                <p>Secure. Plan. Prosper.</p>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Customer ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-button">SIGN IN</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p>Don't have an account? <a href="/create-account">Create account.</a></p>
            </div>
        </div>
    );
};

export default Login;
