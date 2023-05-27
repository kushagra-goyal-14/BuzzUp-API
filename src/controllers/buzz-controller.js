const { StatusCodes } = require("http-status-codes");
const { buzzService } = require("../services/index");

class buzzController {
  constructor() {
    this.buzzservice = new buzzService();
  }
  create = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.buzzservice.create({
        title: payload.title,
        content: payload.content,
        userId: req.user,
      });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a new Buzz",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
}

module.exports = new buzzController();
