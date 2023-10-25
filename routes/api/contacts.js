const express = require("express"); // шмпорт модулю express

const {
  handleGetAll,
  handleContactById,
  handleAddNewContact,
  handleDeleteContactById,
  handleUpdataContactById,
  handleUpdataFavourite,
} = require("../../controllers/contacts");
const { isValid } = require("../../helpers");
const { authorization } = require("../../middlewars");

// створення окремого роуту в API за допомогою виклику методу Router з модулю express
const router = express.Router();

// створення окремих шляхів та їх обробкини
router.get("/", authorization, handleGetAll);

router.get("/:id", authorization, isValid, handleContactById);

router.post("/", authorization, handleAddNewContact);

router.delete("/:id", authorization, isValid, handleDeleteContactById);

router.put("/:id", authorization, isValid, handleUpdataContactById);

router.patch("/:id/favorite", authorization, isValid, handleUpdataFavourite);

module.exports = router;
