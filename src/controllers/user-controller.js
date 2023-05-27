const { StatusCodes } = require("http-status-codes");
const { userService } = require("../services/index");

class userController {
  constructor() {
    this.userService = new userService();
  }
  signup = async (req, res) => {
    try {
      const user = await this.userService.signup({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });
      return res.status(StatusCodes.CREATED).json({
        message: "Successfully created the User",
        err: {},
        data: user,
        success: true,
      });
    } catch (error) {
      if (!error.statusCode) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
      }
      return res.status(error.statusCode).json(error);
    }
  };

  signin = async (req, res) => {
    try {
      const response = await this.userService.signin({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(StatusCodes.OK).json({
        message: "Successfully signed in",
        data: response,
        err: {},
        success: true,
      });
    } catch (error) {
      if (!error.statusCode) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
      }
      return res.status(error.statusCode).json(error);
    }
  };
}

module.exports = new userController();
