const { wrapper, errorHandler } = require("../../helpers");
const Contact = require("../../models/contact");
const { contactSchemaJoi } = require("../../shemas/contacts");

const handleAddNewContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: owner } = req.user;
  console.log(owner);

  const { error } = contactSchemaJoi.validate(req.body);

  if (error) {
    console.log(error.details[0]);
    if (error.details[0].message.includes("is required")) {
      errorHandler(400, "missing required name field");
    }
    const text = error.details[0].message;
    errorHandler(400, text);
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  res.status(201).json(newContact);
};

module.exports = {
  handleAddNewContact: wrapper(handleAddNewContact),
};
