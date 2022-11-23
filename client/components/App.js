// import hooks and react
import React, { useEffect, useState } from 'react';
import axios from 'axios';


// other imports of other components will go ehre
import Login from './Login.js';
import Signup from './Signup.js';
import List from './List.js';
import Submit from './Submit.js';
import View from './View.js';
import Serve from './Serve.js';

function App() {

  // logic to determine what to show!
  const toDisplay = []
  let [appPage, updateAppPage] = useState('login');
  const [viewRecipeId, updateViewRecipeId] = useState('');
  const [userID, setUserID] = useState('');

  const toSignup = () => updateAppPage( appPage = 'signup' );
  const toLogin = () => updateAppPage( appPage = 'login' );
  const toList = () => updateAppPage( appPage = 'list' );
  const toServe = () => updateAppPage( appPage = 'serve' );
  const toView = () => updateAppPage( appPage = 'view' );
  const toSubmit = () => updateAppPage( appPage = 'submit' );
  const signedIn = (served) => {
    console.log('SERVED:', served)
    if (!served) toServe();
    else toList();
    //toSubmit();
    //toList();
    //toView();
    
  }


  // push elements to display
  if (appPage === 'signup') toDisplay.push(<Signup toLogin={toLogin} signedIn={signedIn} setUserID={setUserID} />);
  if (appPage === 'login') toDisplay.push(<Login toSignup={toSignup} signedIn={signedIn} setUserID={setUserID}  />);
  if (appPage === 'list') toDisplay.push(<List toSubmit={toSubmit} toView={toView} viewRecipe={updateViewRecipeId} />);
  if (appPage === 'submit') toDisplay.push(<Submit toList={toList} />);
  if (appPage === 'view') toDisplay.push(<View recipeId={viewRecipeId} toList={toList} userID={userID} />);
  if (appPage === 'serve') toDisplay.push(<Serve viewRecipe={updateViewRecipeId} toList={toList} />);
  //if (appPage === 'serve') toDisplay.push(<Serve />);

  // on load check the server to see if we are logged in by sending cookie
  useEffect(()=>{
    // check session and log in if still in one
    fetchSession((responce) => {
      console.log('res', responce);
      setUserID(responce.userID);
      signedIn(responce.served)}
    ); 
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
      return inSessionCallback(sessionRes.data);
    }
  }
  catch (err) {
    console.warn(err);
  }
}

export default App;