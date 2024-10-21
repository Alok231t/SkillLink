// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import the CSS file

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to SkillLink!</h1>
            <p>This is the homepage of the SkillLink platform. Your gateway to learning new skills.</p>
            
            {/* Links to Register and Login pages */}
            <div className="nav-links">
                <Link to="/register" className="nav-button">Register</Link>
                <Link to="/login" className="nav-button">Login</Link>
            </div>
        </div>
    );
}

export default Home;
