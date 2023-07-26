const Series = require("../model/series");

module.exports = class SeriesService {
  async findAllSeries(max, page) {
    return await Series.find({})
      .populate("messages")
      .limit(max)
      .skip(page)
      .sort({ date: -1 });
  }

  async findSeriesWithId(id) {
    return await Series.findOne({ _id: id }).populate("messages");
  }

  async findAllSeriesWithName(max, offset, name) {
    if (!name) {
      return await Series.find({})
        .limit(max)
        .skip(offset)
        .sort({ date: -1 })
        .populate("messages");
    }
    if (name) {
      return await Series.find({
        name: new RegExp(`${name}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 })
        .populate("messages");
    }
  }

  async findSeriesWithName(name) {
    return await Series.find({
      name: new RegExp(`${name}`, "i"),
    });
  }

  async createSeries(series) {
    return await Series.create(series);
  }

  async updateSeries(id, payload) {
    return await Series.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updateSeriesAndPush(payload, update) {
    return await Series.findOneAndUpdate(payload, update, {
      new: true,
    });
  }
};
