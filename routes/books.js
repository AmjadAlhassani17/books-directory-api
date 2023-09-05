const express = require("express");
const router = express.Router();
const {
  getAllBook,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controller/bookController");

// /api/books
router.route("/").get(getAllBook).post(createBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);

module.exports = router;
