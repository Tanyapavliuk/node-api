const { wrapper, errorHandler } = require("../helpers");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SECRET } = process.env;

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    errorHandler(401);
  }
  try {
    const { id } = jwt.verify(token, SECRET);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== authorization) {
      errorHandler(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    errorHandler(401, "Not authorized");
  }
};

module.exports = {
  authorization: wrapper(authorization),
};
