const {
  commentRepo,
  buzzRepo,
  userRepo,
  notificationRepo,
} = require("../repository/index");

class commentService {
  constructor() {
    this.commentRepo = new commentRepo();
    this.buzzRepo = new buzzRepo();
    this.userRepo = new userRepo();
    this.notificationRepo = new notificationRepo();
  }

  async create(modelId, modelType, userId, content) {
    try {
      console.log(modelId, modelType, userId);

      if (modelType == "Buzz") {
        var commentable = await this.buzzRepo.find(modelId);
        console.log(commentable);
      } else if (modelType == "Comment") {
        //to do
        console.log("it ran");
        console.log(modelId);
        var commentable = await this.commentRepo.get(modelId);
        console.log(commentable);
      } else {
        throw new Error("unknown model type");
      }
      if (commentable) {
        const comment = await this.commentRepo.create({
          content: content,
          onModel: modelType,
          commentable: modelId,
          userId: userId,
          comments: [],
        });
        commentable.comments.push(comment);
        await commentable.save();
        //notification service
        const user = await this.userRepo.getUserById(userId);
        const notif = await this.notificationRepo.create({
          sender: userId,
          receiver: commentable.userId,
          onModel: modelType,
          interactedOn: commentable.id,
          content: `${user.username} commented on your ${modelType}`,
        });
        if (!notif) {
          throw new Error("unable to create comment notification");
        }
        return comment;
      } else {
        throw new Error(`No ${modelId} found with this id`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = commentService;
