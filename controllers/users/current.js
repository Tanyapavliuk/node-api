const { wrapper, errorHandler } = require("../../helpers");

const currentUser = async (req, res, next) => {
  const { id, email, subscription } = req.user;
  if (!id) {
    errorHandler(404);
  }

  res.status(200).json({ status: 200, data: { email, subscription } });
};

module.exports = { currentUser: wrapper(currentUser) };
