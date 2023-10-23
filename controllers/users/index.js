const { registerUser } = require("./register");
const { loginUser } = require("./login");
const { logoutUser } = require("./logout");
const { currentUser } = require("./current");

module.exports = { registerUser, loginUser, logoutUser, currentUser };
