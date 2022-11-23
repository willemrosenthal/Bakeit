const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');

const userController = {}


// create user
userController.createUser = async (req, res, next) => {
  console.log(req.body.username, req.body.password);
  // maybe first try to see if user already exists? If so return an error we can do something with!

  try {
    await User.create({username: req.body.username, password: req.body.password, served: false })
    return next();
  }
  catch (err) {
    return next({
      log: 'userController.createUser failure',
      status: 400,
      message: {err:`userController.createUser fail ${err}`}
    });
  };
}

// get current user
userController.getCurrentUsername = async (req, res, next) => {
  try {
    const id = req.cookies.ssid;
    const myUsername = await User.findById(id);
    res.locals.username = myUsername.username;

    console.log('current user', myUsername.username);

    // if user isn't found
    if (myUsername === null) {
      throw 'USERNAME CANT BE FOUND! userController.getCurrentUsername';
    }

    return next();
  }
  catch (err) {
    next({
      log: 'USERNAME CANT BE FOUND! userController.getCurrentUsername',
      status: 400,
      message: { err: err }
    })
  }
}

// check user served
userController.checkServed = async (req, res, next) => {
  try {
    
    console.log('check if user needs to be served...');
    const id = req.cookies.ssid ? req.cookies.ssid : res.locals.ssid;
    console.log('checking served status on: ', id);

    // save user id to output
    res.locals.userID = id;

    const myUsername = await User.findById(id);
    res.locals.served = myUsername.served;

    console.log('served:', myUsername.served);

    // if user isn't found
    if (myUsername === null) {
      throw 'USERNAME CANT BE FOUND! userController.checkServed';
    }

    return next();
  }
  catch (err) {
    next({
      log: 'USERNAME CANT BE FOUND! userController.checkServed',
      status: 400,
      message: { err: err }
    })
  }
}

// update served
userController.updateServed = async (req, res, next) => {
  try {
    const id = req.cookies.ssid;
    console.log('user id:', id);
    console.log('update served to:', req.body.served);

    const update = { 
      served: req.body.served,
    };

    const result = await User.findByIdAndUpdate(id, update);

    console.log('updated user served to:', update.served, ' prev:', result);
    return next();
  }
  catch {
    next({
      log: 'error: userController.updateServed',
      status: 500,
      message: {err: 'error in userController.updateServed'}
    })
  }
}

// verify user
userController.verifyUser = async (req, res, next) => {
  console.log('verifying user:', req.body.username);
  const {username, password} = req.body;
  // see if username is in DB
  try {
    const result = await User.findOne({username});
    const pwcompare = await bcrypt.compare(password, result.password);
    
    // if user isn't found
    if (result === null || !pwcompare) {
      return res.status(200).json({
        log: 'Wrong username or passwor',
        wrong: true
      })
    }

    return next();
  }
  catch (err) {
    next({
      log: 'userController.verifyUser error - either DB error or wrong user/pass',
      status: 400,
      message: { err: err }
    })
  }
  //
}

module.exports = userController;


