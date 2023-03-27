const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({ ...req.body, user: req.user.id });

    return res.status(201).json({ newPost });
  } catch (error) {
    return res.send(401).json({ message: "No posts found." });
  }
};

exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    // Fetch only posts created by user
    // const posts = await Post.find({ user: req.user.id});

    return res.status(200).json({ posts });
  } catch (error) {
    return res.send(401).json({ message: "No posts found." });
  }
};

exports.fetchPost = async (req, res) => {
  try {
    const fetchedPost = await Post.findById(req.params.id);
    return res.status(200).json({ post: fetchedPost });
  } catch (error) {
    return res.status(401).json({ message: "Could not find post." });
  }
};

exports.editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Post not found" });
    // throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
    // throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
    // throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json("Post not found");
    // throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
    // throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
    // res.status(401);
    // throw new Error("User not authorized");
  }

  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Post deleted.", deletedPost });
};
