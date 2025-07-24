const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  addBook,
  getBooks,
  getBookWithReviews,
  addReview,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", authenticateToken, getBooks);
router.post("/", authenticateToken, addBook);
router.get("/:id", authenticateToken, getBookWithReviews);
router.post("/:id/reviews", authenticateToken, addReview);
router.delete("/:id", authenticateToken, deleteBook);


module.exports = router;
