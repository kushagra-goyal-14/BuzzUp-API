const { StatusCodes } = require("http-status-codes");
const { likeService } = require("../services/index");

class likeController {
  constructor() {
    this.likeservice = new likeService();
  }
  toggleLike = async (req, res) => {
    try {
      const response = await this.likeservice.toggleLike(
        req.query.modelId,
        req.query.modelType,
        req.user
      );
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully toggled like",
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

module.exports = new likeController();
