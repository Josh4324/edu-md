const nodemailer = require("nodemailer");

//initializing variables for mail sending authentication
const GMAIL_USER = process.env.GMAIL_USERNAME;
const GMAIL_PASS = process.env.GMAIL_PASSWORD;
const EMAIL = process.env.EMAIL;
const { AWS_API_USER, AWS_API_PASS, AWS_API_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: AWS_API_HOST,
  port: 465,
  auth: {
    user: AWS_API_USER,
    pass: AWS_API_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class Mailer {
  static sendMail(to, subject, content) {
    const message = {
      from: EMAIL,
      to,
      html: content,
      subject,
    };

    return transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = Mailer;
