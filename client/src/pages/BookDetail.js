import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBook(res.data.book);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("❌ Failed to fetch book", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("⚠️ Rating must be between 1 and 5");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/books/${id}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Review submitted");
      fetchBookDetails(); // refresh after submission
      setRating("");
      setComment("");
    } catch (err) {
      console.error("❌ Error adding review", err);
      alert("Failed to add review");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      {book && (
        <>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Added by:</strong> {book.user?.username || "Unknown"}</p>
        </>
      )}

      <hr />

      <h3>📋 Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={{ marginBottom: "1rem" }}>
            <strong>⭐ {review.rating}</strong> — {review.comment}
            <br />
            <small>by {review.user?.username || "Anonymous"}</small>
          </div>
        ))
      )}

      <hr />

      <h4>Add Review</h4>
      <form onSubmit={handleReviewSubmit}>
        <label>Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
          required
          style={{
            padding: "8px",
            marginBottom: "1rem",
            width: "50%",
            display: "block",
          }}
        />
        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          required
          style={{
            padding: "8px",
            width: "100%",
            height: "80px",
            marginBottom: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default BookDetail;
