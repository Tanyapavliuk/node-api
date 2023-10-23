const bcrypt = require("bcrypt");

const { wrapper, errorHandler } = require("../../helpers");
const userRegisterSchemaJoi = require("../../shemas/users/register");

const User = require("../../models/user");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  const emailIsUse = await User.findOne({ email });
  if (emailIsUse) {
    errorHandler(409, "Email in use");
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hash });

  res.status(201).json({
    status: 201,
    data: { email, password, subscription: newUser.subscription },
  });
};

module.exports = {
  registerUser: wrapper(registerUser),
};
