import React, { useEffect, useState } from 'react';
import axios from 'axios';


function View(props) {

  const [recipeData, updateRecipe] = useState([]);

  // only on load
  useEffect(()=>{
    fetchRecipe(props.recipeId, (data)=>{
      updateRecipe(data);
    });
  },[])

  return (
    <div id='list'>
      RECIPE
    </div>
  );
}

async function fetchRecipe(recipeId, callback) {
  console.log('fetching recipe')
  try {
    const recipes = await axios.get('./recipes/' + recipeId);

    console.log('fetched recipes: ', recipes.data.recipes);
    if (recipes.data.recipes.length !== 0) {
      return callback(recipes.data.recipes);
    }
  }
  catch (err) {
    console.warn(err);
  }
}


export default View;