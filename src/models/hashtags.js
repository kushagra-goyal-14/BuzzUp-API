const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    buzzs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Buzz" }],
  },
  { timestamps: true }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);
module.exports = Hashtag;
