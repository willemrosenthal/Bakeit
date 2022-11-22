import React from 'react';
// other imports of other components will go ehre


function Signup(props) {
  return (
    <div id='signup'>
      <form method='POST' action='/signup' className='signup'>
        SIGNUP
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password"></input>
        <input type="submit" value="create user"></input>
      </form>
      <button name="signup" type="submit" onClick={props.toLogin} >LOG IN</button>
    </div>
  );
  
}

export default Signup;