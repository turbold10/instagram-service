const Route = require("express");
const userModel = require("../models/userSchema");

const userRoute = Route();

userRoute.post("/signup", async (req, res) => {
  const { username, password, email, profileImage } = req.body;
  try {
    const response = await userModel.create({
      username,
      password,
      email,
      profileImage,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRoute.get("/user/posts", async (req, res) => {
  try {
    const posts = await userModel.find().populate("posts", "caption postImage");
    res.status(200).json(posts);
  } catch (error) {}
});

userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId)
    res.status(500).send("cannot follow yourself ");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = userRoute;
