import React from 'react';

function Nav(props) {
  return (
    <div id='nav'>
      <div className='navButton' id='newRecipe' onClick={props.toSubmit}>NEW</div>
      <div className='navButton' id='listLink' onClick={props.toList}>LST</div>
      <div className='navButton' id='favorites' onClick={props.toFav}>FAV</div>
      <div className='navButton' id='friends' onClick={props.toFriends}>FL</div>
    </div>
  );
}

export default Nav;