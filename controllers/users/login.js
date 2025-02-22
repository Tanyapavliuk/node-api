const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { wrapper, errorHandler } = require("../../helpers");

const User = require("../../models/user");

const { SECRET } = process.env;

const loginUser = async (req, res, next) => {
  const { email, password, verify } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    errorHandler(404);
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errorHandler(401, "Email or password is wrong");
  }
  if (!verify) {
    errorHandler(401, "Pleas, verefy your email");
  }

  const id = user._id;
  const token = jwt.sign({ id }, SECRET, { expiresIn: "2 days" });

  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      token: `Bearer ${token}`,
      verificationToken: "",
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    token: updateUser.token,
    user: {
      email: updateUser.email,
      subscription: updateUser.subscription,
      avatarURL: updateUser.avatarURL,
    },
  });
};

module.exports = { loginUser: wrapper(loginUser) };
