const express = require("express"); // шмпорт модулю express

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSub,
} = require("../../controllers/users");
const { validationUserBody, authorization } = require("../../middlewars");

const router = express.Router();

router.post("/register", validationUserBody, registerUser);
router.post("/login", validationUserBody, loginUser);
router.post("/logout", authorization, logoutUser);
router.post("/current", authorization, currentUser);
router.patch("/", authorization, updateSub);

module.exports = router;
