const { wrapper, errorHandler } = require("../../helpers");
const Contact = require("../../models/contact");
const { favoriteSchemaJoi } = require("../../shemas/contacts");

const handleUpdataFavourite = async (req, res, next) => {
  if (req.body.favorite === "") {
    errorHandler(400, "missing field favorite");
  }
  const { error } = favoriteSchemaJoi.validate(req.body);
  if (error) {
    errorHandler(400, `${req.body.favorite} is not valid`);
  }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    errorHandler(404, `Not found`);
  }
  res.status(200).json(result);
};

module.exports = {
  handleUpdataFavourite: wrapper(handleUpdataFavourite),
};
