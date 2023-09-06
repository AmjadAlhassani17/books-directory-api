const asyncHandler = require("express-async-handler");
const Book = require("../model/Book");

const getAllBook = asyncHandler(async (req, res) => {
  const [bookList, _] = await Book.getAllBook();
  res.status(200).json({
    status: {
      success: true,
      code: 200,
      message: "Get All Data Successfuly",
    },
    data: bookList,
  });
});

const getBookById = asyncHandler(async (req, res) => {
  const [book, _] = await Book.getBookById(req.params.id);
  res.status(200).json({
    status: {
      success: true,
      code: 200,
      message: book.length === 0 ? "Data Not Found!" : "Get Data Successfuly",
    },
    data: book,
  });
});

const createBook = asyncHandler(async (req, res) => {
  const { error } = Book.validationPostBook(req.body);

  if (error) {
    res.status(400).json({
      status: {
        success: false,
        code: 400,
        message: "Failed validation data!",
      },
      error: error.details[0].message,
    });
  }

  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    publication_year: req.body.publication_year,
    description: req.body.description,
    price: req.body.price,
  });

  await book.save();

  res.status(201).json({
    status: {
      success: true,
      code: 201,
      message: "Data Insert Successfuly",
    },
    data: {
      message: "Data Insert Successfuly",
    },
  });
});

const updateBookById = asyncHandler(async (req, res) => {
  const { error } = Book.validationUpdateBook(req.body);

  if (error) {
    res.status(400).json({
      status: {
        success: false,
        code: 400,
        message: "Failed validation data!",
      },
      error: error.details[0].message,
    });
  }

  const [result, _] = await Book.updateBookById(
    req.params.id,
    req.body.title,
    req.body.author,
    req.body.publication_year,
    req.body.description,
    req.body.price
  );

  result.affectedRows === 0
    ? res.status(400).json({
        status: {
          success: false,
          code: 400,
          message: "No rows were Update because Book Not Found!",
        },
        data: [],
      })
    : res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: "Data Updated Successfuly",
        },
        data: "Data Updated Successfuly",
      });
});

const deleteBookById = asyncHandler(async (req, res) => {
  const [book, _] = await Book.deleteBookById(req.params.id);

  if (book.affectedRows === 0) {
    res.status(400).json({
      status: {
        success: false,
        code: 400,
        message: "No rows were deleted because Book Not Found!",
      },
      data: [],
    });
  } else {
    res.status(200).json({
      status: {
        success: true,
        code: 200,
        message: "Data Deleted Successfuly",
      },
      data: {
        message: "Data Deleted Successfuly",
      },
    });
  }
});

module.exports = {
  getAllBook,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
