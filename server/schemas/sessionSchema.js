const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
  // cookie with unique id. (this will be the user's id)
  cookieId: {type: String, required: true, unique: true},
  // created date (auto populated) - EXPIRES in 36 horus
  createdAt: {type: Date, expires: 129600, default: Date.now}
});

module.exports = mongoose.model('Session', sessionSchema);