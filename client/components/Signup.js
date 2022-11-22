import React from 'react';
// other imports of other components will go ehre


function Signup() {
  return (
    <form method='POST' action='/signup' id='signup'>
      SIGNUP
      <input name="username" type="text" placeholder="username"></input>
      <input name="password" type="password"></input>
      <input type="submit" value="create user"></input>
    </form>
  );
  
}

export default Signup;