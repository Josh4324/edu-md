const { body, param, validationResult } = require("express-validator");
const { Response } = require("../helpers");

exports.signUpValidationRules = () => {
  return [
    // username must be an email
    body("firstName")
      .notEmpty()
      .isAlpha()
      .trim()
      .escape()
      .withMessage("Please provide your first name"),
    body("lastName")
      .notEmpty()
      .isAlpha()
      .trim()
      .escape()
      .withMessage("Please provide your last name"),
    body("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is required"),
    body("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage(
        "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  ];
};

exports.loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is Required"),
  ];
};

exports.verifyValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is required"),
    body("code").notEmpty().withMessage("Code is Required"),
  ];
};

exports.messageValidationRules = () => {
  return [
    body("topic")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the topic"),
    body("series").notEmpty().withMessage("Please provide the series"),
    body("preacher")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the preacher name"),
    body("summary")
      .notEmpty()
      .isAlpha()
      .trim()
      .escape()
      .withMessage("Please provide the summary"),
    body("audio")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the audio link"),
    body("youtube")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the youtube link"),
  ];
};

exports.seriesValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the name"),
  ];
};

exports.roleValidationRules = () => {
  return [
    body("role")
      .notEmpty()
      .isAlpha()
      .trim()
      .escape()
      .withMessage("Please provide the role"),
  ];
};

exports.resetPasswordValidationRules = () => {
  return [
    body("oldPassword")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the old password"),
    body("newPassword")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Please provide the new password"),
  ];
};

exports.passwordValidationRules = () => {
  return [
    // username must be an email
    body("oldPassword").notEmpty().withMessage("Property name  is required"),
    body("newPassword")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage(
        "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  ];
};

exports.resetValidationRules = () => {
  return [
    // username must be an email
    body("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage(
        "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    body("confirmPassword")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage(
        "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    body("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is required"),
    body("code").notEmpty().withMessage("Code is required"),
  ];
};

exports.validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) =>
      extractedErrors.push({
        [err.param]: err.msg,
      })
    );
    const response = new Response(
      false,
      422,
      `Validation Error`,
      extractedErrors
    );
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(false, 401, `Access Denied`);
    res.status(response.code).json(response);
  }
};
