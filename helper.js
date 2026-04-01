const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_SENDER_API_KEY,
  url: "https://api.eu.mailgun.net"
});

module.exports = { mg };