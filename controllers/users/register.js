const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers/index");

const { wrapper, errorHandler } = require("../../helpers");
const userRegisterSchemaJoi = require("../../shemas/users/register");

const User = require("../../models/user");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  const emailIsUse = await User.findOne({ email });
  if (emailIsUse) {
    errorHandler(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hash = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    email,
    password: hash,
    avatarURL,
    verificationToken,
  });

  sendEmail(email, verificationToken);

  res.status(201).json({
    status: 201,
    data: { email, password, subscription: newUser.subscription, avatarURL },
  });
};

module.exports = {
  registerUser: wrapper(registerUser),
};
