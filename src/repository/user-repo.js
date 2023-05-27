const { StatusCodes } = require("http-status-codes");
const crudRepo = require("./crud");
const User = require("../models/users");
class userRepo extends crudRepo {
  constructor() {
    super(User);
  }
  getUserByEmail = async (userEmail) => {
    try {
      const user = await User.findOne({
        email: userEmail,
      });
      return user;
    } catch (error) {
      throw error;
    }
  };
  getUserById = async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error(
          //   {
          //     message: "Invalid data sent from the client",
          //     explanation: "No registered user found for the given email",
          //   },
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = userRepo;
