import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Emoji from './Emoji';
import Vote from './Vote';


function View(props) {

  const [recipeData, updateRecipe] = useState({name: 'loading', type: '', ingrediants: [], instructions: [], notes: []});

  // only on load
  useEffect(()=>{
    fetchRecipe(props.recipeId, (data)=>{
      console.log('DATA', data)
      updateRecipe(data.recipes);
    });
  },[])

  return (
    <div id='view'>
      <div className='exitView' onClick={props.toList}>X</div>
      
      <div className='recipeTitle'>
        <div className='titleContainer'>
          <h1>{recipeData.name}</h1>
          <div className='recipeType'><Emoji symbol={recipeData.type} /></div>
        </div>
      </div>

      <br></br><br></br>
      <strong>INGREDIANTS</strong><br></br>
      <ul>
        {
          recipeData.ingrediants.map(function(ing, idx) {
            return (<li key={idx}>{ing}</li>)
          })
        }
      </ul>

      <br></br><br></br>
      <strong>INSTRUCTIONS</strong><br></br>
      <ol>
        {
          recipeData.instructions.map(function(inst, idx) {
            return (<li key={idx}>{inst}</li>)
          })
        }
      </ol>
     

      <br></br><br></br>
      <strong>NOTES</strong><br></br>
      <ol>
        {
          recipeData.notes.map(function(note, idx) {
            return (<li key={idx}>{note}</li>)
          })
        }
      </ol>

      <br></br>
      <Vote recipeId={props.recipeId} up={recipeData.up} down={recipeData.down} aggregate={recipeData.aggregate} votes={recipeData.votes} />
  
    </div>
  );
}

async function fetchRecipe(recipeId, callback) {
  console.log('fetching recipe')
  try {
    const recipes = await axios.get('./recipes/' + recipeId);

    console.log('fetched recipes: ', recipes.data.recipe);
    if (recipes.data.recipe !== null) {
      return callback(recipes.data);
    }
  }
  catch (err) {
    console.warn(err);
  }
}


export default View;