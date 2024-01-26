const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.user.id; 

    const posts = await Post.find({ creator: userId });

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts: posts
    });
  } catch (err) {
    console.error(err);
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard'
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).end();
      return;
    }

    res.render('edit-post', {
      layout: 'dashboard',
      post: post
    });
  } catch (err) {
    console.error(err);
    res.redirect('login');
  }
});

module.exports = router;
