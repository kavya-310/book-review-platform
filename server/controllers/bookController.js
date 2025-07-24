const Book = require("../models/Book");
const Review = require("../models/Review"); // ✅ Make sure this model exists

// ✅ Add a new book
const addBook = async (req, res) => {
  const { title, author, description, genre } = req.body;

  if (!title || !author || !description) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newBook = new Book({
      title,
      author,
      description,
      genre,
      user: req.user.userId, // this comes from authenticateToken middleware
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("user", "username");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Fetching books failed" });
  }
};

// ✅ Get book by ID with reviews
const getBookWithReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("user", "username");
    const reviews = await Review.find({ book: req.params.id }).populate("user", "username");
    res.json({ book, reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book or reviews" });
  }
};


// ✅ Add review to a book
const addReview = async (req, res) => {
  // const { id } = req.params;
  const { rating, comment } = req.body;
   const bookId = req.params.id;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment required" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    const review = new Review({
      book:bookId,
      user: req.user.userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ message: "Failed to add review" });
  }
};
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if logged in user is the owner
    if (book.user.toString() !== req.user.id && book.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.status(500).json({ message: "Server error"});
  }
};

// ✅ Export all functions
module.exports = {
  addBook,
  getBooks,
  getBookWithReviews,
  addReview,
  deleteBook,
};
