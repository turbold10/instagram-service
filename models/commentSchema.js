const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
