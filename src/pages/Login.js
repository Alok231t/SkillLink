// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Import the CSS file

function Login() {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' }); // Clear previous messages

        if (email === '' || password === '') {
            setMessage({ text: 'Please fill in all fields.', type: 'error' });
            return;
        }

        try {
            const response = await fetch(`${baseurl}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify({ email, password }), // Convert the data to JSON
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get error response data
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            const data = await response.json(); // Get the successful response data

            // Store the JWT token and user ID in localStorage for future use
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('userId', data.userId); // Store user ID

            // Set success message
            setMessage({ text: 'Login successful!', type: 'success' });

            // Redirect to homepage after successful login
            navigate('/dashboard'); // Redirect to the homepage
        } catch (error) {
            console.error('Login error:', error); // Log the error for debugging
            setMessage({ text: error.message, type: 'error' }); // Set the error message for display
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to the registration page
    };

    // Inline styles for the Register button
    const registerButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff', // Blue background
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px', // Space above the button
        transition: 'background-color 0.3s ease',
    };

    const registerButtonHoverStyle = {
        ...registerButtonStyle,
        backgroundColor: '#0056b3', // Darker blue on hover
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Set email
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Set password
                        required
                    />
                </div>
                <input type="submit" value="Login" />
                {message.text && ( // Display the message if it exists
                    <div className={message.type === 'success' ? 'success' : 'error'}>
                        {message.text}
                    </div>
                )}
            </form>
            <button 
                onClick={handleRegister} 
                style={registerButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = registerButtonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = registerButtonStyle.backgroundColor}
            >
                Register
            </button>
        </div>
    );
}

export default Login;
