const { registerUser } = require("./register");
const { loginUser } = require("./login");
const { logoutUser } = require("./logout");
const { currentUser } = require("./current");
const { updateSub } = require("./updateSudscr");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSub,
  updateAvatar,
};
