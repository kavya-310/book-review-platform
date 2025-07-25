import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("📚 Books from backend:", res.data);
        setBooks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    console.log("📛 Deleting book with ID:", bookId);
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Book deleted");
      // Update the local UI
    //   setBooks((prev) => prev.filter((book) => book._id !== bookId));
      setBooks(books.filter((book) => book._id !== bookId)); 
    } catch (err) {
      console.error("❌ Error deleting book", err);
      alert("❌ Failed to delete book");
    }
  };

  const filteredBooks = genreFilter
    ? books.filter((book) => book.genre === genreFilter)
    : books;

  return (
    <div>
      <h2>📚 Book List</h2>

      <label>Filter by genre: </label>
      <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Biography">Biography</option>
        <option value="Fantasy">Fantasy</option>
      </select>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredBooks.length === 0 ? (
          <p>No books available.</p>
        ) : (
          filteredBooks.map((book) => (
            <li key={book._id} style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #ccc" }}>
              <Link to={`/books/${book._id}`} style={{ textDecoration: "none" }}>
                <h3>{book.title}</h3>
              </Link>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Description: {book.description || "No description"}</p> {/* ✅ description */}
              <p>Added by: {book.user?.username || "Unknown"}</p>

              <button
                onClick={() => handleDelete(book._id)}
                style={{
                  background: "crimson",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                 Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BookList;
