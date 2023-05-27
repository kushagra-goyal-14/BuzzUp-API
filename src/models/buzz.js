const mongoose = require("mongoose");

const buzzSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: [260, "Buzz can't be more than 260 characters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    // image: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Buzz = mongoose.model("Buzz", buzzSchema);
module.exports = Buzz;
