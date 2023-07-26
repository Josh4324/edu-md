const ServiceGroup = require("../model/service");

module.exports = class ServiceGroupService {
  async findAllServiceGroup(max, offset) {
    return await ServiceGroup.find({})
      .limit(max)
      .skip(offset)
      .sort({ date: -1 })
      .populate("users");
  }

  async findServiceGroupWithId(id) {
    return await ServiceGroup.findOne({ _id: id });
  }

  async createServiceGroup(group) {
    return await ServiceGroup.create(group);
  }

  async updateServiceGroup(id, payload) {
    return await ServiceGroup.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updateServiceAndPush(payload, update) {
    return await ServiceGroup.findOneAndUpdate(payload, update, {
      new: true,
    });
  }
};
