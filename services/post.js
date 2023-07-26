const Post = require("../model/post");

module.exports = class PostService {
  async findAllPost(max, offset, category) {
    if (!category) {
      return await Post.find({}).limit(max).skip(offset).sort({ date: -1 });
    }
    if (category) {
      return await Post.find({
        category: new RegExp(`${category}`, "i"),
      })
        .limit(max)
        .skip(offset)
        .sort({ date: -1 });
    }
  }

  async findPostWithId(id) {
    return await Post.findOne({ _id: id });
  }

  async createPost(postObj) {
    return await Post.create(postObj);
  }

  async updatePost(id, payload) {
    return await Post.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }

  async updatePostImage(id, payload) {
    return await Post.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
