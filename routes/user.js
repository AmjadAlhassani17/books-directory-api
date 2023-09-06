const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");

// /api/user/
router.get("/", verifyTokenAndAdmin, getAllUser);

// /api/user/:id
router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

module.exports = router;
