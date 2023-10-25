const { handleGetAll } = require("./getAll");
const { handleContactById } = require("./findById");
const { handleAddNewContact } = require("./addContact");
const { handleDeleteContactById } = require("./deleteById");
const { handleUpdataContactById } = require("./updateById");
const { handleUpdataFavourite } = require("./updateFavorite");

module.exports = {
  handleGetAll,
  handleContactById,
  handleAddNewContact,
  handleDeleteContactById,
  handleUpdataContactById,
  handleUpdataFavourite,
};
