const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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
// app.use(cookieParser());

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
app.post('/signup', (req, res)=>{
  return res.status(200).json({message: 'signup success'});
})

// LOGIN
app.post('/login', (req, res)=>{
  return res.status(200).json({message: 'signup success'});
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