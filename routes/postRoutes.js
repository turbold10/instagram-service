const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const authMiddleware = require("../auth-middleware");

const postRoute = Route();

postRoute.post("/post/create", async (req, res) => {
  const { caption, postImage, userId } = req.body;
  try {
    const createdPost = await postModel.create({
      caption,
      postImage,
      userId,
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });
    res.status(200).json(createdPost);
  } catch (error) {
    throw new Error(error);
  }
});

postRoute.get("/posts", authMiddleware, async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("userId", "username profileImage");
    res.json(posts);
  } catch (error) {
    res.status(404).json({ messsage: `failed to get posts, ${error}` });
  }
});

module.exports = postRoute;
