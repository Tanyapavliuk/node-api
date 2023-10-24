const express = require("express");
const logger = require("morgan");
const cors = require("cors"); // обробка cors запитів

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/users/auth");

const app = express(); // створення API

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // логування операцій залежно від режиму роботи

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // обробка формату json в req.body

app.use("/api/contacts", contactsRouter); // імпорт окремого роуту
app.use("/users", authRouter); // імпорт окремого роуту

// обробка, якщо роуту не знайдено
app.use((req, res) => {
  res.status(404).json({ status: 404, data: { message: "Not found page" } });
});

// функція обробки помилок
// по дефолту обробка помилки серверу
// обов'язково 4 аргументи!!!
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";
  res.status(status).json({ status, data: { message: err.message } });
});

module.exports = app;
