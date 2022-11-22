import React from 'react';
// other imports of other components will go ehre


function Login() {
  return (
    <form method="POST" action='/login' className='login'>
      LOGIN
      <input name="username" type="text" placeholder="username"></input>
      <input name="password" type="password" placeholder="password"></input>
      <input type='submit' value="login"></input>
    </form>
  );
  
}

export default Login;