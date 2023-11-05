const express = require("express"); // шмпорт модулю express
const multer = require("multer");
const path = require("path");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSub,
  updateAvatar,
  sendEmail,
  verification,
  duplicateVerefi,
} = require("../../controllers/users");
const { validationUserBody, authorization } = require("../../middlewars");

const router = express.Router();

const tempPath = path.join(__dirname, "..", "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname);
  },
});

const upload = multer({ storage: multerConfig });

router.post("/register", validationUserBody, registerUser);
router.post("/email", sendEmail);
router.get("/verify/:verificationToken", verification);
router.post("/users/verify", duplicateVerefi);
router.post("/login", validationUserBody, loginUser);
router.post("/logout", authorization, logoutUser);
router.post("/current", authorization, currentUser);
router.patch("/", authorization, updateSub);
router.patch("/avatars", authorization, upload.single("avatar"), updateAvatar);

module.exports = router;
