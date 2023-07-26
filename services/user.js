const User = require("../model/user");
const Token = require("../helpers/Token");
const token = new Token();

module.exports = class UserService {
  async isUserExist(email) {
    const user = await User.findOne({
      email,
    });

    return user;
  }

  async isUserValid(email, password) {
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return null;
    }

    const checkPassword = await user.correctPassword(user.password, password);

    if (!user || !checkPassword) {
      return null;
    }

    return await User.findOne({ _id: user._id });
  }

  async createUser(user) {
    const newUser = await User.create(user);
    return await User.findOne({ _id: newUser._id });
  }

  async updateUserWithId(id, payload) {
    return await User.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async updateUserWithEmail(email, payload) {
    return await User.findOneAndUpdate(email, payload, {
      new: true,
    });
  }

  async generateToken(user) {
    const newToken = await token.generateToken(user);
    return newToken;
  }

  async findUserWithEmail(email) {
    return await User.findOne({ email }).select("+code");
  }

  async findUserWithGoogleId(googleId) {
    return await User.findOne({ googleId });
  }

  async findUserWithId(id) {
    return await User.findOne({ _id: id });
  }

  async findUserWithEmailAndGetPassword(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findUserWithIdAndGetPassword(id) {
    return await User.findOne({ _id: id }).select("+password");
  }
};
