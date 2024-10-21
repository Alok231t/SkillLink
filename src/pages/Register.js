import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const baseurl = process.env.REACT_APP_BASE_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false); // New state for loading effect
    const navigate = useNavigate();
    const [code, setCode] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleVerificationChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const sendVerificationCode = async (email) => {
        try {
            if (!email) {
                throw new Error("Email is required");
            }

            setIsLoading(true); // Start loading effect

            const apiUrl = `${baseurl}/Auth/verify-email?email=${encodeURIComponent(email)}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to verify email.');
            }

            const responseData = await response.json();
            setIsCodeSent(true);
            setCode(responseData.verificationCode);
            setMessage({ text: 'Verification code sent to your email!', type: 'success' });
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setIsLoading(false); // Stop loading effect
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (isCodeSent) {
            if (verificationCode === code) {
                try {
                    setIsLoading(true); // Start loading effect

                    const registrationResponse = await fetch(`${baseurl}/Auth/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (!registrationResponse.ok) {
                        const errorData = await registrationResponse.json();
                        throw new Error(errorData.message || 'Registration failed.');
                    }

                    const data = await registrationResponse.json();
                    setMessage({ text: data.message || "Registration successful!", type: 'success' });
                    navigate('/'); // Redirect to homepage after successful registration
                } catch (error) {
                    setMessage({ text: error.message, type: 'error' });
                } finally {
                    setIsLoading(false); // Stop loading effect
                }
            } else {
                setMessage({ text: 'Invalid verification code.', type: 'error' });
            }
        } else {
            sendVerificationCode(formData.email);
        }
    };

    return (
        <div className="register-container">
            <h2>{isCodeSent ? 'Verify Your Email' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isCodeSent ? (
                    <>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </label>
                        <label>
                            Confirm Password:
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </label>
                        <label>
                            First Name:
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </label>
                    </>
                ) : (
                    <>
                        <label>
                            Verification Code:
                            <input type="text" value={verificationCode} onChange={handleVerificationChange} required />
                        </label>
                    </>
                )}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? (isCodeSent ? 'Verifying Code...' : 'Sending Code...') : (isCodeSent ? 'Verify Code' : 'Send Verification Code')}
                </button>
            </form>
            {message.text && (
                <p className={message.type === 'success' ? 'success' : 'error'}>
                    {message.text}
                </p>
            )}
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                Back to Homepage
            </p>
        </div>
    );
}

export default Register;
