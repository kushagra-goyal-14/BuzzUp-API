const crudRepo = require("./crud");
const Buzz = require("../models/buzz");
class buzzRepo extends crudRepo {
  constructor() {
    super(Buzz);
  }
  async find(id) {
    try {
      const res = await Buzz.findById(id).populate({ path: "likes" });
      return res;
    } catch (error) {
      console.log("something went wrong in the repository leayer " + error);
      throw error;
    }
  }
}
module.exports = buzzRepo;
