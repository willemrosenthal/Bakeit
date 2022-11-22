// import hooks and react
import React, { useEffect, useState } from 'react';


// other imports of other components will go ehre
import Login from './Login.js';
import Signup from './Signup.js';

function App() {

  // logic to determine what to show!
  const toDisplay = []
  let [appPage, updateAppPage] = useState('login');

  const toSignup = () => updateAppPage( appPage = 'signup' );
  const toLogin = () => updateAppPage( appPage = 'login' );
  const toList = () => updateAppPage( appPage = 'toList' );

  // push elements to display
  if (appPage === 'signup') toDisplay.push(<Signup toLogin={toLogin} />);
  if (appPage === 'login') toDisplay.push(<Login toSignup={toSignup}/>);
  //if (appPage === 'in') toDisplay.push(<List />);

  // on load check the server to see if we are logged in by sending cookie
  useEffect(()=>{
    // props.Test();
    fetchSession((result)=>{
      console.log('session fetched: ', result);
    })
  },[]);

  return (
    <div className='app'>
      { toDisplay }
    </div>
  );
  
}

function fetchSession(callback) {
  const url = "./login";
  // fetch from login url
  fetch(url, callback)
  // once sucessful...
  .then((response) => {
    // if responce is sucessfull: i.e. 200-299 message
    if (response.status >= 200 && response.status < 300) {
      // parses the responce
      const res = response.json();
      console.log('FETCH SESSION RESPONCE: ', res);
      return res;
    } else {
      throw new Error("STATUS FAIL: " + response.status);
    }
  })
  // if the responce is sucessfull...
  .then((response) => {
    // do something
    return 'succes' + response;
  })
  // if error, log error
  .catch((error) => {
    console.warn(error);
  });

  // update state
  // if login successful or session is in
  //updateAppPage( appPage = 'in' );
  // else go to signup page
  return 'got here'
}

export default App;