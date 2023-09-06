const asyncHandler = require("express-async-handler");
const Auth = require("../model/Auth");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { error } = Auth.validationPostUser(req.body);

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

  let [user, _] = await Auth.checkUserEmail(req.body.email);

  if (user.length > 0) {
    return res.status(400).json({
      status: {
        success: false,
        code: 400,
        message: "This user already registered",
      },
      data: [],
    });
  } else {
    let auth = new Auth({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      address: req.body.address,
      phone_number: req.body.phone_number,
      isAdmin: req.body.isAdmin == null ? 0 : req.body.isAdmin,
    });

    await auth.save();
    let [dataUser, _] = await Auth.checkUserEmail(req.body.email);

    const token = await jwt.sign(
      { id: dataUser[0].id, isAdmin: dataUser[0].isAdmin },
      process.env.JWT_SECRET_KEY
    );
    dataUser[0].token = token;

    res.status(201).json({
      status: {
        success: true,
        code: 201,
        message: "created user Successfuly",
      },
      data: dataUser,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { error } = Auth.validationLoginUser(req.body);

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

  let [user, _] = await Auth.checkUserEmail(req.body.email);

  if (user.length > 0) {
    const isPasswordCorrect = user[0].password === req.body.password;
    console.log(user[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: {
          success: false,
          code: 400,
          message: "invalid email or password",
        },
        data: [],
      });
    }

    const token = await jwt.sign(
      { id: user[0].id, isAdmin: user[0].isAdmin },
      process.env.JWT_SECRET_KEY
    );
    user[0].token = token;

    res.status(200).json({
      status: {
        success: true,
        code: 200,
        message: "login user Successfuly",
      },
      data: user,
    });
  } else {
    return res.status(400).json({
      status: {
        success: false,
        code: 400,
        message: "invalid email or password",
      },
      data: [],
    });
  }
});

module.exports = {
    registerUser,
    loginUser
}
