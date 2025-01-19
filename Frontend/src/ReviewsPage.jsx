import React from "react";
import { useLocation } from "react-router-dom";

const ReviewsPage = () => {
    const location = useLocation();
    const reviews = location.state?.reviews || [];

    return (
        <div className="reviews-page">
            <h1>Scraped Reviews</h1>
            {reviews.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Rating</th>
                            <th>Reviewer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.title}</td>
                                <td>{review.body}</td>
                                <td>{review.rating}</td>
                                <td>{review.reviewer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default ReviewsPage;
