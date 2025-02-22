//модуль для валідації joi
const Joi = require("joi");
//схема валідації
const contactSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dot", "org", "info"] },
    })
    .required(),
  phone: Joi.string().max(14).required(),
  favorite: Joi.bool().default(false),
});

module.exports = contactSchemaJoi;
