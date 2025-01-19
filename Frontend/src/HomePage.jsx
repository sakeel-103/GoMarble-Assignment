import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const HomePage = () => {
    const [url, setUrl] = useState(""); // User input for URL
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    // Function to fetch reviews from the backend
    const fetchReviews = async () => {
        if (!url.trim()) { // Ensure non-empty, trimmed URL
            setError("Please enter a valid URL.");
            return;
        }

        try {
            const response = await axios.get(`https://gomarble-assignment-wz5f.onrender.com/api/reviews?page=${encodeURIComponent(url)}`);
            if (response.data.reviews && Array.isArray(response.data.reviews)) {
                navigate("/reviews", { state: { reviews: response.data.reviews } });
                setError(""); // Clear any previous errors
            } else {
                setError("No reviews found or invalid data structure.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch reviews.");
        }
    };

    return (
        <>
            <h1 className="header-title">GoMarble : Review Scraper</h1>
            <div className="container">
                <h2>Enter Product Page URL</h2>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Enter product page URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={fetchReviews}>Fetch Reviews</button>
                </div>

                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
};

export default HomePage;
