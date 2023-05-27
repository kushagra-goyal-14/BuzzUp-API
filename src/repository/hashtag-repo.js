const crudRepo = require("./crud");
const Hashtag = require("../models/hashtags");
class hashtagRepo extends crudRepo {
  constructor() {
    super(Hashtag);
  }
  async bulkCreate(data) {
    try {
      const tags = await Hashtag.insertMany(data);
      return tags;
    } catch (error) {
      console.log(error);
    }
  }
  async findByName(titleList) {
    try {
      const tags = await Hashtag.find({
        title: titleList,
      });
      return tags;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = hashtagRepo;
