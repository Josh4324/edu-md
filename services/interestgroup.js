const InterestGroup = require("../model/interestgroup");

module.exports = class InterestGroupService {
  async findAllInterestGroup(max, offset) {
    return await InterestGroup.find({})
      .limit(max)
      .skip(offset)
      .sort({ date: -1 })
      .populate("users");
  }

  async findInterestGroupWithId(id) {
    return await InterestGroup.findOne({ _id: id });
  }

  async createInterestGroup(group) {
    return await InterestGroup.create(group);
  }

  async updateInterestGroup(id, payload) {
    return await InterestGroup.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updateInterestAndPush(payload, update) {
    return await InterestGroup.findOneAndUpdate(payload, update, {
      new: true,
    });
  }
};
