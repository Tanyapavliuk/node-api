const { wrapper, errorHandler } = require("../../helpers");
const User = require("../../models/user");

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    errorHandler(404);
  }

  await User.findByIdAndUpdate(user.id, {
    verificationToken: "",
    verify: true,
  });

  res.status(200).json({ status: 200, message: "Verification successful" });
};
module.exports = { verification: wrapper(verification) };
