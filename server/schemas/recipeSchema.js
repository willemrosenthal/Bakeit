const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  ingrediants: [{
    type: String
  }],
  instructions: [{
    type: String
  }],
  notes: [{
    type: String
  }],
  creator: {type: String, required: true },
  up: {type: Number, defualt: 0},
  down: {type: Number, defualt: 0},
  aggregate: {type: Number, defualt: 0},
  votes: {type: Number, defualt: 0}
});

module.exports = mongoose.model('Recipe', recipeSchema);