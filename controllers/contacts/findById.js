const { wrapper } = require("../../helpers");
const Contact = require("../../models/contact");

const handleContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    errorHandler(404);
  }
  res.json(contactById);
};

module.exports = {
  handleContactById: wrapper(handleContactById),
};