const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "please provide the sender"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "please provide the sender"],
    },
    content: {
      type: String,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Buzz", "Comment", "User"],
    },
    interactedOn: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel",
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
