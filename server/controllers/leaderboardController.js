const User = require('../models/userModel');

const leaderboardController = {};

leaderboardController.createUser = async (req, res, next) => {
  const { name, min, sec, milsec } = req.body;

  // Error handling
  if (!name)
    // check if request is UNSUSSCESSFUL
    return next({
      log: 'Missing name in leaderboardController.createUser.',
      // Status 400 Server Error
      status: 400,
      message: {
        err: 'An error occured in edge case within leaderboardController.createUser',
      },
    });

  try {
    const user = new User({ name, min, sec, milsec });
    await user.save();
    console.log('Create new user: ', user);
    return next();
  } catch (err) {
    return next({
      log: `An error occured in leaderboardController.createUser: ${err}`,
      // Status 500 Databse Error
      status: 500,
      message: {
        err: 'An error occured in leaderboardController.createUser',
      },
    });
  }
};

leaderboardController.getAllUsers = async (req, res, next) => {
  try {
    // Return an Array with ALL USERS sorted!
    res.locals.users = await User.find().sort({ min: -1, sec: -1, milsec: -1 });
    return next();
  } catch (err) {
    return next({
      log: `An error occured in leaderboardController.getAllUsers: ${err}`,
      // Status 500 Databse Error
      status: 500,
      message: {
        err: 'An error occured in leaderboardController.getAllUsers',
      },
    });
  }
};

module.exports = leaderboardController;
