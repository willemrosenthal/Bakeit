const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

//ENV
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// monogoURI
const mongoURI = `mongodb+srv://willemro:${process.env.PW}@bakeit.ixry9we.mongodb.net/?retryWrites=true&w=majority`;
// connect to mongoose
mongoose.connect(mongoURI)
  .then(()=>console.log('Connected to MongoDB'))
  .catch((err)=>console.log(`Error connecting to MongoDB:${err}`));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// controllers
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const recipeController = require('./controllers/recipeController');

// send static stuff
app.use('/client', express.static(path.resolve(__dirname, '../client')));


// PRODICTION ONLY CODE
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// SIGNUP
app.post('/signup', userController.createUser, sessionController.setSSIDCookie, sessionController.startSession, (req, res)=>{
  console.log('successfully created user: ', req.body.username);
  return res.status(200).json({message: 'signup success'});
})

// LOGIN
app.post('/login', userController.verifyUser, sessionController.setSSIDCookie, sessionController.startSession, (req, res)=>{
  console.log('login success:', req.body);
  return res.status(200).json({message: 'login success'});
})

// GET SESSION
app.get('/session', sessionController.isLoggedIn, (req, res)=>{
  console.log('session found', res.locals.inSession);
  return res.status(200).json({session: res.locals.inSession});
})

// GET SINGLE RECIPE
app.get('/recipes/:id', recipeController.getRecipe, (req, res)=>{
  console.log('sending single: ', res.locals.recipe.name);
  return res.status(200).json({recipes: res.locals.recipe}); 
})

// UPDATE VOTES ON SINGLE RECIPE
app.post('/recipes/:id', recipeController.vote, (req, res)=>{
  console.log('vote accepted:');
  return res.status(200).json({accepted: true}); 
})

// GET RECIPES
app.get('/recipes', recipeController.getAllRecipes, (req, res)=>{
  console.log('sending: ', res.locals.recipes.length, ' recipes');
  return res.status(200).json({recipes: res.locals.recipes}); 
})

// POST RECIPES
app.post('/recipes', userController.getCurrentUsername, recipeController.submitRecipe, (req, res)=>{
  console.log('recipe submitted');
  return res.status(200).json({accepted: true})
})

// display site
// app.get('/', cookieController.setCookie, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

// post recipie

// get today recipie // <-- this will use an algraithm to 



// catch-all
app.use((req, res) => res.sendStatus(404));

// global
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error caught an unknow middleware error',
    status: 400,
    message: { err: 'error occured'}
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, ()=>{console.log(`server listeing to port: ${PORT}`)});

module.exports = app;