const { wrapper, errorHandler } = require("../../helpers");
const Contact = require("../../models/contact");

const handleDeleteContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactDeleteById = await Contact.findByIdAndRemove(id);
  if (contactDeleteById === null) {
    errorHandler(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  handleDeleteContactById: wrapper(handleDeleteContactById),
};
