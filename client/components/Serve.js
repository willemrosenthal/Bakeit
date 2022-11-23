import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import View from './View.js';
import Vote from './Vote.js';

function Serve(props) {

  const [err, setErr] = useState('');
  const [recipeToServe, setRecipeToServe] = useState({});

  let display = [];
  if (recipeToServe._id) display = [
    <div className='serve'><View recipeId={recipeToServe._id} toList={props.toList} noExit='true' noVote='true' /></div>,
    <Vote recipeId={recipeToServe._id} up={recipeToServe.up} down={recipeToServe.down} aggregate={recipeToServe.aggregate} votes={recipeToServe.votes} toList={props.toList} />
  ]

  // only on load
  useEffect(()=>{
    getRecipeToServe((data)=>{
      setRecipeToServe(data);
      console.log('updated', data);
    });
  },[])

  const getRecipeToServe = async (callback) => {

    console.log('CLIENT: getting recipe to serve...');

    try {
      const recipe = await axios.get('./serve');

      console.log("CLIENT: didnt die!");
      console.log('fetched recipe: ', recipe.data);
      if (recipe.data._id) {
        return callback(recipe.data);
      }
      else {
        throw 'error: no recipes found to serve!';
      }
    }
    catch (err) {
      console.warn(err);
    }

  }

  return (
    <div className='serveContainer'>  
      {display}
    </div>
  );
}

export default Serve;