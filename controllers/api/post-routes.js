const express = require('express');
const router = express.Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.user.id });
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByPk(postId);

    if (!updatedPost) {
      res.status(404).end();
      return;
    }

    await updatedPost.update(req.body);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete an existing post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByPk(postId);

    if (!deletedPost) {
      res.status(404).end();
      return;
    }

    await deletedPost.destroy();
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
