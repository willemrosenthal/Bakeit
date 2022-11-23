import React, { useState } from 'react';
import axios from 'axios';
// other imports of other components will go ehre


function Login(props) {
  const [err, setErr] = useState('');
  const [makingRequest, setMakingRequest] = useState(false);

  const onSubmit = async (event) => {
    // prevent reload
    event.preventDefault();
    // prevent multiple clicks while processsing
    if (makingRequest) console.log('making request still. this click wont do anything.');

     // build data to send
     const login = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    setMakingRequest(true);
    try {
      // prepare axios post
      const {data} = await axios.post('/login', login, { headers: {'Content-Type': 'application/json', Accept: 'application/json',} } );
      // the data to send
      console.log('login responce:', JSON.stringify(data));  
      if (data.wrong) {
        setErr('wrong username or password');
      }
      else {
        // sign you in
        props.signedIn();
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setMakingRequest(false);
    }
  }

  return (
    <div id='login' className='loginSignup'>
      <form method="POST" action='/login' className='login' onSubmit={onSubmit}>
        LOGIN<br></br>
        {err}<br></br>
        <input name="username" type="text" placeholder="username"></input><br></br>
        <input name="password" type="password" placeholder="password"></input><br></br>
        <input type='submit' value="login"></input>
      </form>
      <button name="signup" type="submit" onClick={props.toSignup} >SIGN UP</button>
    </div>
  );

  
}



export default Login;