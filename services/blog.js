const Blog = require("../model/blog");

module.exports = class BlogService {
  async findAllBlog(max, page) {
    return await Blog.find({}).limit(max).skip(page).sort({ date: -1 });
  }

  async findBlogWithId(id) {
    return await Blog.findOne({ _id: id });
  }

  async createBlog(blog) {
    return await Blog.create(blog);
  }

  async updateBlog(id, payload) {
    return await Blog.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  }
};
