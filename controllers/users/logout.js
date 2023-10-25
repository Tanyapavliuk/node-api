const { wrapper, errorHandler } = require("../../helpers");
const User = require("../../models/user");

const logoutUser = async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    errorHandler(404);
  }

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json({ status: 204, data: { message: "No Content" } });
};

module.exports = { logoutUser: wrapper(logoutUser) };
