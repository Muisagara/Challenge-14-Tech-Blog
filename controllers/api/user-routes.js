const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Route for user signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
    req.session.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
    req.session.save();

    res.json({ user, message: 'You are now logged in!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
