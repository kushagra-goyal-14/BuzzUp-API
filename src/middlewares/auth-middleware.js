const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server-config");
const { userRepo } = require("../repository/index");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json("No token provided");
    }
    const response = jwt.verify(token, JWT_SECRET);
    if (!response) {
      return res.status(StatusCodes.BAD_REQUEST).json("Token not verified");
    }
    const userRepository = new userRepo();
    const user = await userRepository.getUserById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      return res.status(StatusCodes.NOT_FOUND).json(error);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  isAuthenticated,
};
