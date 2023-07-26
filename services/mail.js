const EmailNotifications = require("../helpers/emailNotifications");

module.exports = class EmailService {
  async sendWelcomeEmail(email, code, name) {
    return EmailNotifications.sendWelcomeEmail(email, name);
  }

  async sendSignupEmail(email, code, name) {
    return EmailNotifications.sendSignUpEmail(email, code, name);
  }

  async sendResetEmail(email, code, name, browser, os) {
    return EmailNotifications.sendResetEmail(email, code, name, browser, os);
  }

  async sendPasswordSuccessEmail(email, name, browser, os) {
    return EmailNotifications.sendPasswordSuccessEmail(
      email,
      name,
      browser,
      os
    );
  }
};
