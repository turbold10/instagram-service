const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const postRoute = Route();

// postRoute.get("/posts", async (req, res) => {
//   const posts = await postModel.find().populate("userId", "email username _id");
//   res.status(200).json(posts);
// });

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

postRoute.get("/posts", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("likes", "username profileImage");
  res.status(200).json(posts);
});

postRoute.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate({
    path: "likes",
    populate: {
      path: "users",
      select: "username email",
    },
  });
  res.status(200).json(posts);
});

module.exports = postRoute;
