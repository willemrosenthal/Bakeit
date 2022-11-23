// import hooks and react
import React, { useEffect, useState } from 'react';


// other imports of other components will go ehre
import Login from './Login.js';
import Signup from './Signup.js';
import List from './List.js';
import Submit from './Submit.js';
import axios from 'axios';

function App() {

  // logic to determine what to show!
  const toDisplay = []
  let [appPage, updateAppPage] = useState('login');

  const toSignup = () => updateAppPage( appPage = 'signup' );
  const toLogin = () => updateAppPage( appPage = 'login' );
  const toList = () => updateAppPage( appPage = 'list' );
  const toServe = () => updateAppPage( appPage = 'serve' );
  const toSubmit = () => updateAppPage( appPage = 'submit' );
  const signedIn = () => {
    //toSubmit();
    toList();
  }


  // push elements to display
  if (appPage === 'signup') toDisplay.push(<Signup toLogin={toLogin} signedIn={signedIn} />);
  if (appPage === 'login') toDisplay.push(<Login toSignup={toSignup} signedIn={signedIn} />);
  if (appPage === 'list') toDisplay.push(<List toSubmit={toSubmit} />);
  if (appPage === 'submit') toDisplay.push(<Submit toList={toList} />);
  //if (appPage === 'serve') toDisplay.push(<Serve />);

  // on load check the server to see if we are logged in by sending cookie
  useEffect(()=>{
    // check session and log in if still in one
    fetchSession(() => signedIn()); 
  },[]);

  return (
    <div className='app'>
      { toDisplay }
    </div>
  );
  
}

async function fetchSession(inSessionCallback) {
  try {
    const sessionRes = await axios.get('./session');
    console.log('session res: ', sessionRes);
    if (sessionRes.data.session) {
      console.log('in session:', sessionRes.data, sessionRes.data.session);
      return inSessionCallback();
    }
  }
  catch (err) {
    console.warn(err);
  }
}

export default App;