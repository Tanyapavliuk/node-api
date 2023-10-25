const { wrapper, errorHandler } = require("../../helpers");
const Contact = require("../../models/contact");
const { contactSchemaJoi } = require("../../shemas/contacts");

const handleUpdataContactById = async (req, res, next) => {
  if (!req.body) {
    errorHandler(400, "missing fields");
  }

  const { error } = contactSchemaJoi.validate(req.body);
  if (error) {
    const massege = error.details[0].message;
    if (massege.includes("is required")) {
      errorHandler(400, "missing required name field");
    }
    errorHandler(400, massege);
  }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (result === null) {
    errorHandler(404);
  }
  res.json(result);
};

module.exports = {
  handleUpdataContactById: wrapper(handleUpdataContactById),
};
