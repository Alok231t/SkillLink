// src/App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'; // Import Home component
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Import Dashboard component

function App() {
    return (
        <BrowserRouter>
            <Routes>
               
                {/* Route for the home page */}
                <Route path="/" element={<Home />} />

                {/* Routes for login and register */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Route for the dashboard page */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
