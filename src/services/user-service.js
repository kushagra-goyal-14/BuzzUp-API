const { userRepo, notificationRepo } = require("../repository/index");
class userService {
  constructor() {
    this.userRepo = new userRepo();
    this.notificationRepo = new notificationRepo();
  }
  signup = async (data) => {
    try {
      const user = await this.userRepo.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  };

  signin = async (data) => {
    try {
      const user = await this.userRepo.getUserByEmail(data.email);
      if (!user) {
        throw new Error(
          //   {
          //     message: "Invalid data sent from the client",
          //     explanation: "No registered user found for the given email",
          //   },
          StatusCodes.NOT_FOUND
        );
      }
      const passwordMatch = user.comparePassword(data.password);
      if (!passwordMatch) {
        throw new Error(
          //   {
          //     message: "Invalid data sent from the client",
          //     explanation: "Password given is not correct, please try again!",
          //   },
          "new error"
        );
      }
      const jwtToken = user.generateJWT();
      return {
        token: jwtToken,
        username: user.username,
      };
    } catch (error) {
      throw error;
    }
  };

  followToggle = async (cuId, uId) => {
    try {
      const cuser = await this.userRepo.getUserById(cuId);
      console.log(cuser);
      const user = await this.userRepo.getUserById(uId);
      if (cuser && user) {
        let found = cuser.following.includes(uId);
        console.log(found);
        if (found) {
          cuser.following.pull(uId);
          user.followers.pull(cuId);
          await cuser.save();
          await user.save();
        } else {
          cuser.following.push(uId);
          user.followers.push(cuId);
          await cuser.save();
          await user.save();
          //notification service
          const notif = await this.notificationRepo.create({
            sender: cuId,
            receiver: uId,
            onModel: "User",
            interactedOn: cuId,
            content: `${cuser.username} has started following you`,
          });
          if (!notif) {
            throw new Error("unable to user create notification");
          }
        }
      } else {
        throw new Error("invalid user id's");
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userService;
