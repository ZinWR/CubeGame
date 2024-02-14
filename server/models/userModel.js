const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*--------------------------------------- Schema ---------------------------------------*/
const userSchema = new Schema({
  name: { type: String, required: true },
  min: { type: Number, required: true },
  sec: { type: Number, required: true },
  milsec: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// exports models
module.exports = mongoose.model('User', userSchema);
