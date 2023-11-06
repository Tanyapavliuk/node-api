const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, verefToken) => {
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
    subject: "Verefy your email",
    html: `<div>
        <h1>Please click here for verefy your email</h1>
        <a
          target="_blank"
          href="http://localhost:3000/users/verify/${verefToken}"
        >
          Click
        </a>
      </div>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
