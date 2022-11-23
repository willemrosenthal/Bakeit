import { ConnectionStates } from 'mongoose';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// components
import AddedField from './AddedField';
import Nav from './Nav';

function Submit(props) {

  const [makingRequest, setMakingRequest] = useState(false);
  const [recipes, updateRecipes] = useState([]);
  const [err, setErr] = useState('');
  const [cID, setCID] = useState(0);

  // ingrediants, instructions, notes
  const [ingrediants, setIngrediants] = useState([<AddedField fieldSection='ingrediants' id='0' removeField={removeField} hideX={true} />]);
  const [instructions, setInstructions] = useState([<AddedField fieldSection='instructions' id='0' removeField={removeField} hideX={true} />]);
  const [notes, setNotes] = useState([<AddedField fieldSection='notes' id='0' removeField={removeField} hideX={true} />]);


  // const ingrediants = [<AddedField fieldSection='ingrediants' id='0' />];
  // const instructions = [<AddedField fieldSection='instructions' id='0' />];
  // const notes = [<AddedField fieldSection='notes' id='0' />];

  const incrementCID = () => setCID(cID + 1);

  // // only on load
  // useEffect(()=>{
  //   fetchRecipes((data)=>{
  //     updateRecipes(data);
  //   });
  // },[])
  const addIngrediant = () => {
    const newIngrediants = ingrediants.concat(<AddedField fieldSection='ingrediants' id={cID} removeField={removeField} />);
    incrementCID();
    setIngrediants(newIngrediants);
  }
  const addInstruction = () => {
    const newInstructions = instructions.concat(<AddedField fieldSection='instructions' id={cID} removeField={removeField} />);
    incrementCID();
    setInstructions(newInstructions);
  }
  const addNote = () => {
    const newNotes = notes.concat(<AddedField fieldSection='notes' id={cID} removeField={removeField} />);
    incrementCID();
    setNotes(newNotes);
  }

  function removeField(id, field) {
    let workingList = [];

  

    // const newList = [];
    // for (let i = 0; i < workingList.length; i++) {
    //   if (i !== id) {
    //     newList.push(workingList)
    //     console.log('id?', newList[i].params.id)
    //   }
    //   console.log('copy list:', i, id, (i === id));
    // }

    
    if (field === 'ingrediants') {
      if (ingrediants.length === 0) return;
      console.log('initial num', ingrediants.length);
      const newIngrediants = ingrediants.splice(0,ingrediants.length);
      console.log('remaining num', newIngrediants.length);
      setIngrediants(newIngrediants);
    }
    else if (field === 'instructions') {
      if (instructions.length === 0) return;
      const newInstructions = instructions.splice(0,instructions.length);
      setInstructions(newInstructions);
    }
    else if (field === 'notes') {
      if (notes.length === 0) return;
      const newNotes = notes.splice(0,notes.length);
      setNotes(newNotes);
    }
  }


  const onSubmit = async (event) => {
    event.preventDefault();
    
    const recipeToSend = {
      name: event.target.name.value,
      type: event.target.type.value,
      ingrediants: [],
      instructions: [],
      notes: []
    }
  
    // pull out elements from form for ingrediants, instcutions, notes
    Array.prototype.forEach.call(event.target.elements, (element) => {
      if (element.name === 'ingrediants') recipeToSend.ingrediants.push( element.value );
      if (element.name === 'instructions') recipeToSend.instructions.push( element.value );
      if (element.name === 'notes') recipeToSend.notes.push( element.value );
    })
  
    console.log('sending recipe:', recipeToSend);
  
    // prevent multiple clicks while processsing
    if (makingRequest) console.log('making request still. this click wont do anything.');
  
    setMakingRequest(true);
    try {
      // prepare axios post
      const {data} = await axios.post('/recipes', recipeToSend, { headers: {'Content-Type': 'application/json', Accept: 'application/json',} } );
      // the data to send
      console.log('send recipe responce:', JSON.stringify(data));  
      if (data.accepted) {
        console.log('recipe submitted!');
        props.toList();
      }
      else {
        // sign you in
        setErr('failure. try again');
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setMakingRequest(false);
    }
  }


  return (
    <div id='submitRecipe'>
      <form method='POST' action='/recipes' className='submitRecipe' onSubmit={onSubmit}>
        SUBMIT RECIPE<br></br>
        <input name="name" type="text" placeholder="recipe name"></input><br></br>

        <label for="type-select">Type</label>
        <select name="type" id="type-select">
          <option value="0x1F36A">🍪</option>
          <option value="0x1F382">🎂</option>
          <option value="0x1F370">🍰</option>
          <option value="0x1F9C1">🧁</option>
          <option value="0x1F967">🥧</option>
          <option value="0x1F36E">🍮</option>
          <option value="0x1F96E">🥮</option>
          <option value="0x1F95E">🥞</option>
          <option value="0x1F9C7">🧇</option>
          <option value="0x1F968">🥨</option>
          <option value="0x1F956">🥖</option>
          <option value="0x1F950">🥐</option>
        </select><br></br><br></br>

        ingrediants<br></br>
        {[ingrediants]}
        <button type="button" onClick={addIngrediant}>ADD</button><br></br><br></br>

        instructions<br></br>
        {[instructions]}
        <button type="button" onClick={addInstruction}>ADD</button><br></br><br></br>

        notes<br></br>
        {[notes]}
        <button type="button" onClick={addNote}>ADD</button><br></br><br></br>

        {err}<br></br>
        <input type="submit" value="SUBMIT" ></input>
      </form>
      <Nav />
    </div>
  );
}



export default Submit;