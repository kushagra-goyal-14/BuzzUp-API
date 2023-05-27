const express = require("express");
const router = express.Router();
const {
  buzzController,
  likeController,
  commentController,
  userController,
} = require("../../controllers/index");
const { AuthMiddlewares } = require("../../middlewares/index");

router.post(
  "/createbuzz",
  AuthMiddlewares.isAuthenticated,
  buzzController.create
);
router.post(
  "/likes/toggle",
  AuthMiddlewares.isAuthenticated,
  likeController.toggleLike
);
router.post(
  "/comments",
  AuthMiddlewares.isAuthenticated,
  commentController.create
);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/home", AuthMiddlewares.isAuthenticated, (req, res) => {
  return res.status(200).json({ message: "ok" });
});

module.exports = router;
