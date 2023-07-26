const UserService = require("../services/user");
const MailService = require("../services/mail");
const { Response, Token } = require("../helpers");
const UAParser = require("ua-parser-js");
const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
const { userLogger } = require("../logger");

const userService = new UserService();
const mailService = new MailService();

exports.signUp = async (req, res) => {
  try {
    const { email, firstName } = req.body;
    const isUserExist = await userService.isUserExist(email);
    if (isUserExist) {
      const response = new Response(true, 409, "This user already exists");
      return res.status(response.code).json(response);
    }
    const verificationCode = uuidv4().slice(0, 5);
    req.body.code = verificationCode;
    const user = await userService.createUser(req.body);
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };
    const token = await userService.generateToken(payload);
    await mailService.sendSignupEmail(email, verificationCode, firstName);
    await mailService.sendWelcomeEmail(email, firstName);
    const response = new Response(true, 201, "User created successfully", {
      user,
      token,
    });
    userLogger.info(`New user created - ${user._id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.isUserValid(email, password);
    if (!user) {
      const response = new Response(false, 401, "Incorrect email or password");
      return res.status(response.code).json(response);
    }
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };
    const token = await userService.generateToken(payload);
    const response = new Response(true, 200, "User logged in Successfully", {
      user,
      token,
    });
    userLogger.info(`User Logged In - ${user._id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.payload;
  try {
    const user = await userService.updateUserWithId(id, req.body);

    const response = new Response(
      true,
      200,
      "User profile updated successfully",
      user
    );
    userLogger.info(`User Data Updated - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.payload;
  try {
    const user = await userService.findUserWithId(id);

    const response = new Response(true, 200, "Data fetched successfully", user);
    userLogger.info(`Data Fetched - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userService.isUserExist(email);
    if (!user) {
      const response = new Response(true, 409, "This user does not exists");
      return res.status(response.code).json(response);
    }

    const code = uuidv4().slice(0, 5);
    await userService.updateUserWithEmail(email, { code });
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const browser = result.browser.name;
    const os = result.os.name;

    await mailService.sendResetEmail(email, user.firstName, code, browser, os);

    const response = new Response(true, 200, "Email sent to mail");
    userLogger.info(`User Forget Password - ${user._id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    // redirect user to token invalid or expired page
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    res.status(response.code).json(response);
  }
};

exports.confirmOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await userService.findUserWithEmail(email);

    if (!user) {
      const response = new Response(true, 409, "This user does not exists");
      return res.status(response.code).json(response);
    }

    if (user.code !== code) {
      const response = new Response(true, 409, "Invalid token");
      return res.status(response.code).json(response);
    }

    const updatePayload = {
      status: true,
    };

    await userService.updateUserWithId(user._id, updatePayload);

    const response = new Response(true, 200, "OTP confirmed Successfully");
    userLogger.info(`User Confirmed OTP - ${user._id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err}`);
    return res.status(response.code).json(response);
  }
};

exports.reset = async (req, res) => {
  try {
    const { password, confirmPassword, email, code } = req.body;

    const user = await userService.findUserWithEmail(email);

    if (!user) {
      const response = new Response(true, 409, "This user does not exists");
      return res.status(response.code).json(response);
    }

    if (user.code !== code) {
      const response = new Response(
        true,
        409,
        "Invalid code or code has expired"
      );
      return res.status(response.code).json(response);
    }

    if (password !== confirmPassword) {
      const response = new Response(
        false,
        401,
        "Password and confirmPassword to do match"
      );
      return res.status(response.code).json(response);
    }

    const pass = await argon2.hash(password);

    await userService.updateUserWithEmail(email, { password: pass });

    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const browser = result.browser.name;
    const os = result.os.name;

    await mailService.sendPasswordSuccessEmail(
      email,
      user.firstName,
      browser,
      os
    );

    const response = new Response(true, 200, "Password reset successful");
    userLogger.info(`User reset password without Auth - ${id}`);
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    return res.status(response.code).json(response);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const { id } = req.payload;

    const user = await userService.findUserWithIdAndGetPassword(id);

    const userPassword = user.password;
    const checkPassword = await argon2.verify(userPassword, oldPassword);

    if (!user || !checkPassword) {
      const response = new Response(false, 401, "Incorrect password");
      return res.status(response.code).json(response);
    }

    const password = await argon2.hash(newPassword);

    await userService.updateUserWithId(id, { password });

    const response = new Response(true, 200, "Password reset successful");
    userLogger.info(`User reset password with auth - ${id}`);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    userLogger.error(`An error occured: ${err} - ${id}`);
    return res.status(response.code).json(response);
  }
};
