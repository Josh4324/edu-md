const Commit = require("../model/commitment");

module.exports = class CommitService {
  async findAllCommit(max, offset) {
    return await Commit.find({}).limit(max).skip(offset).sort({ date: -1 });
  }

  async findCommitWithId(id) {
    return await Commit.findOne({ _id: id });
  }

  async findCommitWithUserId(userId) {
    return await Commit.findOne({ userId });
  }

  async createCommit(post) {
    return await Commit.create(post);
  }

  async updateCommit(id, payload) {
    return await Commit.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
