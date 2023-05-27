const { StatusCodes } = require("http-status-codes");
const { commentService } = require("../services/index");

class commentController {
  constructor() {
    this.commentService = new commentService();
  }
  create = async (req, res) => {
    try {
      const response = await this.commentService.create(
        req.query.modelId,
        req.query.modelType,
        req.user,
        req.body.content
      );
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a comment",
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

module.exports = new commentController();
