const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const leaderboardRouter = require('./routes/router');

const PORT = 3000;
/*--------------------------------------- MongoDB ---------------------------------------*/
const MONGO_URI =
  'mongodb+srv://quannguyen63:WTH4sm0SL7tJsvaF@cubethreedata.ozjufec.mongodb.net/?retryWrites=true&w=majority';
/* Username: quannguyen63 - Password: WTH4sm0SL7tJsvaF */

mongoose
  .connect(MONGO_URI, {
    dbName: 'users', // sets the name of the DB
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));
/*--------------------------------------- Server & Routers ---------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Open index.html
app.use(express.static(path.resolve(__dirname, '../public')));

// LeaderboardRouter
app.use('/leaderboard', leaderboardRouter);

/*--------------------------------------- Errors ---------------------------------------*/
// Unknown Route Handler
app.use('*', (req, res) =>
  res
    .status(404)
    .sendFile(path.join(__dirname, '../public/error404/error404.html'))
);

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});
/*--------------------------------------- Server Listen ---------------------------------------*/
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
