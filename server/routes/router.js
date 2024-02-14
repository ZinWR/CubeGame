const express = require('express');
const path = require('path');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Load Leaderboard
router.get('/', (req, res) =>
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../public/leaderboard/leaderboard.html'))
);

// Save Button
router.post('/', leaderboardController.createUser, (req, res) =>
  res.status(200).json('Score Saved!')
);

// Get All Users
router.get('/users', leaderboardController.getAllUsers, (req, res) =>
  res.status(200).json({ users: res.locals.users })
);

module.exports = router;
