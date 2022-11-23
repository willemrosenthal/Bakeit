import React from 'react';

function Nav(props) {
  return (
    <div id='nav'>
      <div className='navButton' id='newRecipe' onClick={props.toSubmit}>NEW</div>
      <div className='navButton' id='listLink'>LST</div>
      <div className='navButton' id='favorites'>FAV</div>
      <div className='navButton' id='friends'>FL</div>
    </div>
  );
}

export default Nav;