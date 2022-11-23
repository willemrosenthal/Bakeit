import React from 'react';
import Emoji from './Emoji';

function RecipeCard(props) {

  let voteDir = 'upArr';
  const votes = props.up-props.down;
  if (Number(props.down) > Number(props.up)) voteDir = 'downArr'

  const typeIcon = props.recipeType ? props.recipeType : '0x1F60A';

  const arrow = Number(props.down) > Number(props.up) ? '0x2B07' : '0x2B06';

  const upIcon = '0x2B06';
  const downIcon = '0x2B07';

  return (
    <div className='card' onClick={()=>{props.viewRecipe(props.id); props.toView()}}> 
      <div className='cardInfo'>
        <div className='rType'><Emoji symbol={typeIcon} /></div>
        <div className='rName'>{props.name}</div>
      </div>
      <div className='votes'>
        <div className={'arr ' + voteDir}><Emoji symbol={arrow} /></div>
        {/* <div className={'arr ' + voteDir}></div> */}
        <div className='voteNum'>{votes}</div>
      </div>
    </div>
  );
}

export default RecipeCard;