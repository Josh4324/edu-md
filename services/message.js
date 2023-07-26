const Message = require("../model/message");

module.exports = class MessageService {
  async findAllMessages(max, offset, name, pastor) {
    if (!name && !pastor) {
      return await Message.find({}).limit(max).skip(offset).sort({ date: -1 });
    }

    if (name && pastor) {
      return await Message.find({
        topic: new RegExp(`${name}`, "i"),
        pastor: new RegExp(`${pastor}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 });
    }

    if (name) {
      return await Message.find({
        topic: new RegExp(`${name}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 });
    }
    if (pastor) {
      return await Message.find({
        pastor: new RegExp(`${pastor}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 });
    }
  }

  async findMessageWithId(id) {
    return await Message.findOne({ _id: id });
  }

  async createMessage(message) {
    return await Message.create(message);
  }

  async updateMessage(id, payload) {
    return await Message.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
