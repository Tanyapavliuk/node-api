const { wrapper, errorHandler, sendEmail } = require("../../helpers");
const User = require("../../models/user");

const duplicateVerefi = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    errorHandler(400, "missing required field email");
  }
  const { verefy, verificationToken } = await User.findOne({ email });

  if (!verefy) {
    sendEmail(email, verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  }
  res.status(400).json({ message: "Verification has already been passed" });
};

module.exports = { duplicateVerefi: wrapper(duplicateVerefi) };
