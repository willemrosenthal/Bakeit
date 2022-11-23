const User = require('../schemas/userSchema');
const Session = require('../schemas/sessionSchema');

const sessionController = {}

// create cookie with session ID
sessionController.setSSIDCookie = async (req, res, next) => {
  // create cookie with the user's ID
  try {
    const user = await User.findOne({username: req.body.username});
    const id = user._id.toString();
    console.log('user ID:', id);
    res.cookie('ssid', id, {httpOnly: true, overwrite: true});
    // save in locals for startSession method
    console.log('session cookie created');
    res.locals.ssid = id;
    return next();
  }
  catch (err) {
    next({
      log: 'error: sessionController.setSSIDCookie',
      status: 400,
      message: {err: 'error in sessionController.setSSIDCookie'}
    })
  }
}

// check if logged in by looking at cookie
sessionController.isLoggedIn = async (req, res, next) => {
  // see if SSID in cookie is in the DB
  try {
    const cookieResult = await Session.findOne({cookieId: req.cookies.ssid});
    res.locals.inSession = (cookieResult !== null);
    return next();
  }
  catch {
    next({
      log: 'error: sessionController.isLoggedIn - session db error',
      status: 400,
      message: {err: 'error in sessionController.isLoggedIn'}
    })
  }
}

// start a new session - after logging in or signing up
sessionController.startSession = async (req, res, next) => {
  // see if session is in the db
  try {

    console.log('check for session...');
    const checkForSession = await Session.findOne({cookieId: res.locals.ssid});
    if (checkForSession) {
      console.log('session found: deleting it to start a new one.');
      // update session if its found, delete it so we can make a new one
      await Session.findOneAndDelete({cookieId: res.locals.ssid});
    } 
    console.log('new session created');
    // only create a new session if we don't have one arleady
    await Session.create({cookieId: res.locals.ssid});
  }
  catch (err) {
    return next({
      log: 'sessionController.startSession failure',
      status: 400,
      message: {err:`sessionController.startSession fail ${err}`}
    })
  }
  return next();
}

module.exports = sessionController;