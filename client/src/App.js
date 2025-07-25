import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      {/* 🔗 Navigation */}
      <nav style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
        <Link to="/books" style={{ marginRight: "10px" }}>📚 View Books</Link>
        <Link to="/add-book" style={{ marginRight: "10px" }}>➕ Add Book</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>🔐 Login</Link>
        <Link to="/register">📝 Register</Link>
      </nav>

      {/* 📄 Routes */}
      <Routes>
        <Route path="/books" element={isLoggedIn ? <BookList /> : <Navigate to="/login" />} />
        <Route path="/add-book" element={isLoggedIn ? <AddBook /> : <Navigate to="/login" />} />
        <Route path="/books/:id" element={isLoggedIn ? <BookDetail /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
}

export default App;
