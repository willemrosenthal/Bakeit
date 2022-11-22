const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// require in bcrypt here & add salt work factor
const salt_work_factor = 10;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// ADD A HASH FUNCTION HERE
userSchema.pre('save', async function(next) {
  // this.password = await bcrypt.hash(this.password, salt_work_factor);
  return next();
}); 

module.exports = mongoose.model('User', userSchema);