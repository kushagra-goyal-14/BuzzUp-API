const { buzzRepo, hashtagRepo } = require("../repository/index");
class buzzService {
  constructor() {
    this.buzzRepo = new buzzRepo();
    this.hashRepo = new hashtagRepo();
  }
  create = async (data) => {
    try {
      const result = await this.buzzRepo.create(data);
      let content = result.content;
      let tags = content
        .match(/(#(?:[^\x00-\x7F]|\w)+)/g)
        ?.map((e) => e.substring(1).toLowerCase());

      if (tags !== undefined || null) {
        let presentTags = await this.hashRepo.findByName(tags);
        let presentTagnames = presentTags.map((e) => e.title);
        let newTags = tags.filter((e) => !presentTagnames.includes(e));
        newTags = newTags.map((e) => {
          return { title: e, buzzs: result._id };
        });
        await this.hashRepo.bulkCreate(newTags);
        presentTags.forEach((e) => {
          e.buzzs.push(result._id);
          e.save();
        });
      }
      return result;
    } catch (error) {
      console.log("Something went wrong at the service layer " + error);
      throw error;
    }
  };
}

module.exports = buzzService;
