const { wrapper, errorHandler } = require("../../helpers");
const Contact = require("../../models/contact");
const {
  contactSchemaJoi,
  favoriteSchemaJoi,
} = require("../../shemas/contacts");

//обробка запитів

const handleGetAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;
  // find({фільтер по власнику за ід}, "поля що не відображаються",{пагінація вбудована в moongose skip - пропуск, limit - кількість})
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(data);
};

const handleContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    errorHandler(404);
  }
  res.json(contactById);
};

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

const handleDeleteContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactDeleteById = await Contact.findByIdAndRemove(id);
  if (contactDeleteById === null) {
    errorHandler(404);
  }
  res.json({ message: "contact deleted" });
};

const handleUpdataContactById = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body) {
    errorHandler(400, "missing fields");
  }

  const { error } = contactSchemaJoi.validate(req.body);

  if (error) {
    console.log(error.details[0]);
    if (error.details[0].message.includes("is required")) {
      errorHandler(400, "missing required name field");
    }
    const text = error.details[0].message;
    errorHandler(400, text);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (result === null) {
    errorHandler(404);
  }
  res.json(result);
};
const handleUpdataFavourite = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body.favorite) {
    errorHandler(400, "missing field favorite");
  }

  const { error } = favoriteSchemaJoi.validate(req.body);

  if (error) {
    errorHandler(400, `${req.body.favorite} is not valid`);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    errorHandler(404, `Not found`);
  }
  res.status(200).json(result);
};

// експорт функція огорнутих в шаблонізатор try catch
// в функцію шаблон (передається функція) та викликається в середині шаблону
module.exports = {
  handleGetAll: wrapper(handleGetAll),
  handleContactById: wrapper(handleContactById),
  handleAddNewContact: wrapper(handleAddNewContact),
  handleDeleteContactById: wrapper(handleDeleteContactById),
  handleUpdataContactById: wrapper(handleUpdataContactById),
  handleUpdataFavourite: wrapper(handleUpdataFavourite),
};
