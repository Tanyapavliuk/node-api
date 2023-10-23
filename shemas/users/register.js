const Joi = require("joi");

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const userRegisterSchemaJoi = Joi.object({
  email: Joi.string()
    .email(
      {
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "dot", "org", "info"] },
      },
      "Please, write valid email"
    )
    .pattern(emailPattern, "Please, write valid email")
    .description("Please, write valid like : example@example.com")
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .description(
      "Password has to be more than 6 symbols, but less than 30 ones"
    )
    .required(),
});

module.exports = userRegisterSchemaJoi;
