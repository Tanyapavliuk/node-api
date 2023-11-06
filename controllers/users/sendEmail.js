const nodemailer = require("nodemailer");
const { wrapper } = require("../../helpers/index");

require("dotenv").config();

const sendEmail = async (req, res, next) => {
  const { email, message } = req.body;

  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "tanyapavliuk@meta.ua",
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "tanyapavliuk@meta.ua",
    to: `${email}`,
    subject: "Send email from Tanya",
    text: message,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
  res.json({ to: `${email}`, message });
};

module.exports = { sendEmail: wrapper(sendEmail) };
