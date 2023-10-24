const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", (err, data, next) => {
  err.status = 400;
  next();
});

const User = model("user", usersSchema);

module.exports = User;
