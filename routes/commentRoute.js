const Route = require("express");
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");

const commentRoute = Route();

commentRoute.post("/comment", async (req, res) => {
  const { comment, postId, userId } = req.body;
  console.log("working");
  try {
    const commentResponse = await commentModel.create({
      comment,
      postId,
      userId,
    });

    const test = await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: commentResponse._id,
      },
    });
    console.log(test);
    res.send(commentResponse);
  } catch (error) {
    console.log(error);
    throw new Error("failed to add comment to post", error);
  }
});

commentRoute.get("/post/:postId", async (req, res) => {
  const { postId } = req.query;
  const response = await postModel.find(postId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImage",
    },
  });
  res.send(response);
});

module.exports = { commentRoute };
