const asyncHandler = require("express-async-handler");
const Auth = require("../model/Auth");

const getAllUser = asyncHandler(async (req, res) => {
  const [userList, _] = await Auth.getAllUser();
  res.status(200).json({
    status: {
      success: true,
      code: 200,
      message:
        userList.length === 0 ? "Users Not Found!" : "Get Users Successfuly",
    },
    data: userList,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const [user, _] = await Auth.getUserById(req.params.id);
  res.status(200).json({
    status: {
      success: true,
      code: 200,
      message: user.length === 0 ? "User Not Found!" : "Get User Successfuly",
    },
    data: user,
  });
});

const updateUserById = asyncHandler(async (req, res) => {
  const { error } = Auth.validationUpdateUser(req.body);

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

  const [result, _] = await Auth.updateUserById(
    req.params.id,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.first_name,
    req.body.last_name,
    req.body.date_of_birth,
    req.body.address,
    req.body.phone_number,
    req.body.isAdmin
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

const deleteUserById = asyncHandler(async (req, res) => {
    const [user, _] = await Auth.deleteUserById(req.params.id);

    if (user.affectedRows === 0) {
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
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById
};
