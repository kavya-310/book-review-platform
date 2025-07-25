import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/books",
        { title, author, genre, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Book added!");
      navigate("/"); // Redirect to Book List
    } catch (err) {
      console.error("❌ Failed to add book", err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={inputStyle}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Biography">Biography</option>
          <option value="Fantasy">Fantasy</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "100px", resize: "none" }}
        />
        <button type="submit" style={buttonStyle}>Add Book</button>
      </form>
    </div>
  );
};

// Reusable styles
const inputStyle = {
  padding: "12px",
  marginBottom: "1rem",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "1rem"
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: "white",
};

const buttonStyle = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer"
};

export default AddBook;
