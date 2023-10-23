const Joi = require("joi");

const favoriteSchemaJoi = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = favoriteSchemaJoi;
