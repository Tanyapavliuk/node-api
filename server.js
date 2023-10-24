const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err), process.exit(1);
  });
