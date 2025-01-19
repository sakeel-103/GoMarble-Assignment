// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation (optional if using React Router)
import "./App.css"; // Import the corresponding CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    GoMarble
                </Link>
                <ul className="navbar-links">
                    <li className="navbar-item">
                        <Link to="#" className="navbar-link">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="#" className="navbar-link">
                            About
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="#" className="navbar-link">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
