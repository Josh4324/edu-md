const Request = require("../model/request");

module.exports = class RequestService {
  async findAllRequest(max, offset) {
    return await Request.find({}).limit(max).skip(offset).sort({ date: -1 });
  }

  async findRequestWithId(id) {
    return await Request.findOne({ _id: id });
  }

  async findRequestWithUserId(userId) {
    return await Request.findOne({ userId });
  }

  async createRequest(post) {
    return await Request.create(post);
  }

  async updateRequest(id, payload) {
    return await Request.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
