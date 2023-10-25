const { wrapper, errorHandler } = require("../../helpers");
const User = require("../../models/user");
const shema = require("../../shemas/users/subscription.js");

const updateSub = async (req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const { error } = shema.validate({ subscription });
  if (error) {
    errorHandler(
      400,
      "Please, choose one of this value :'starter', 'pro', 'business' "
    );
  }

  const updateUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    user: {
      email: updateUser.email,
      subscription: updateUser.subscription,
    },
  });
};

module.exports = {
  updateSub: wrapper(updateSub),
};
