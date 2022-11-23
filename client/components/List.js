import { ConnectionStates } from 'mongoose';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// components
import Nav from './Nav.js';
import RecipeCard from './RecipeCard';

function List(props) {

  const [recipes, updateRecipes] = useState([]);

  let allRecipes = [<RecipeCard name='loading...' up='100' down='3' />]

  // populate
  if (allRecipes.length !== 0) allRecipes = [];
  for (const r of recipes) {
    allRecipes.push(
      <RecipeCard name={r.name} up={r.up} down={r.down} recipeType={r.type} />
    );
  }

  // only on load
  useEffect(()=>{
    fetchRecipes((data)=>{
      updateRecipes(data);
      console.log('updated', data);
    });
  },[])

  return (
    <div id='list'>
      {allRecipes}
      <Nav toSubmit={props.toSubmit} toList={props.toList} toFav={props.toFav} toFriends={props.toFriends} />
    </div>
  );
}

async function fetchRecipes(callback) {
  console.log('fetching recipes')
  try {
    const recipes = await axios.get('./recipes');

    console.log('fetched recipes: ', recipes.data.recipes);
    if (recipes.data.recipes.length !== 0) {
      return callback(recipes.data.recipes);
    }
  }
  catch (err) {
    console.warn(err);
  }
}


export default List;