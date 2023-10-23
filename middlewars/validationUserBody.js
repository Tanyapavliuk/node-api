const userRegisterSchemaJoi = require("../shemas/users/register");
const { wrapper, errorHandler } = require("../helpers");

const validationUserBody = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    errorHandler(400, "Please, fill in all required input");
  }

  const { error } = userRegisterSchemaJoi.validate(req.body);
  if (error) {
    errorHandler(400, `Please, ${error.details[0].message}`);
  }

  next();
};

module.exports = {
  validationUserBody: wrapper(validationUserBody),
};
