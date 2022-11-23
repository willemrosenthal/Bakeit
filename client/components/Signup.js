import React, { useState } from 'react';
import axios from 'axios';
// other imports of other components will go ehre


function Signup(props) {

  // dont need this.... i can just access it from the event.
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [makingRequest, setMakingRequest] = useState(false);
  const [err, setErr] = useState('');
  

  // function onSubmit(event) {
  //   event.preventDefault();
    
  //   console.log('n: ', name, 'p: ', pass);

  //   // access input values using name prop
  //   console.log('username', event.target.username.value);
  //   console.log('password', event.target.password.value);

  //   const signupUser = {
  //     username: event.target.username.value,
  //     password: event.target.password.value
  //   }

  //   // clear all input values in the form
  //   event.target.reset();
  // }

  const onSubmit = async (event) => {
    // not really nessesary, but this prevents further clicks if we are still in awaiting a responce
    if (makingRequest) console.log('making request still. this click wont do anything.');

    // prevent click from realoding the page
    event.preventDefault();

    // build data to send
    const signupUser = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    setMakingRequest(true);
    try {
      // prepare axios post
      const {data} = await axios.post(
        '/signup',
        signupUser,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      // the data to send
      console.log(JSON.stringify(data, null, 4));

      // sign you in
      props.signedIn();
      
    } catch (err) {
      // error message
      setErr(err.message);
    } finally {
      // we are no longer loading
      setMakingRequest(false);
      console.log('request complete');
    }
  };

  // not remove the on change stuff and the username and pw stuff. we dont need it.

  return (
    <div id='signup' className='loginSignup'>
      <form method='POST' action='/signup' className='signup' onSubmit={onSubmit}>
        SIGNUP<br></br>
        {err}<br></br>
        <input name="username" type="text" placeholder="username" onChange={event => setName(event.target.value)}></input><br></br>
        <input name="password" type="password" onChange={event => setPass(event.target.value)}></input><br></br>
        <input type="submit" value="create user" ></input>
      </form>
      <button name="signup" type="submit" onClick={props.toLogin} >LOG IN</button>
    </div>
  );
}

// function signupPost() {

// }

//onClick={()=>{signupPost()}}

export default Signup;