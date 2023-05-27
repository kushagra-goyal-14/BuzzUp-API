const crudRepo = require("./crud");
const Likes = require("../models/likes");
class likeRepo extends crudRepo {
  constructor() {
    super(Likes);
  }
  async findByuserAndlikeable(data) {
    try {
      const res = await Likes.findOne(data);
      return res;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = likeRepo;
