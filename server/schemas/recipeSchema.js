const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  name: {type: String, required: true},
  ingrediants: [{
    type: String
  }],
  instructions: [{
    type: String
  }],
  notes: [{
    type: String
  }],
  up: {type: Number, defualt: 0},
  down: {type: Number, defualt: 0},
  votes: {type: Number, defualt: 0},
  creator: {type: String, required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);