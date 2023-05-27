const crudRepo = require("./crud");
const Comments = require("../models/comments");
class commentRepo extends crudRepo {
  constructor() {
    super(Comments);
  }
}
module.exports = commentRepo;
