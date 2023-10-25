const Joi = require("joi");

const SubscriptionJoi = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

module.exports = SubscriptionJoi;
