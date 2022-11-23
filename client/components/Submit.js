import React, { useEffect, useState } from 'react';
import axios from 'axios';
// components
import AddedField from './AddedField';
import Nav from './Nav';

function Submit(props) {

  const [makingRequest, setMakingRequest] = useState(false);
  const [recipes, updateRecipes] = useState([]);
  const [err, setErr] = useState('');

  // ingrediants, instructions, notes
  const [ingrediants, setIng] = useState([{id:'0', value: '', hideX: true}]);
  const [instructions, setInst] = useState([{id:'0', value: '', hideX: true}]);
  const [notes, setNote] = useState([]);

  const addIngrediant = () => {
    const newList = ingrediants.concat({hideX: false, value: ''})
    setIng(newList)
  }
  const addInstruction = () => {
    const newList = instructions.concat({hideX: false, value: ''})
    setInst(newList)
  }
  const addNote = () => {
    const newList = notes.concat({hideX: false, value: ''})
    setNote(newList)
  }

  function updateFieldVal(id, field, value) {
    console.log('update:', id, field, value);
    if (field === 'ingrediants') {
      const newList = [...ingrediants];
      newList[id].value = value;
      setIng(newList);
    }
    else if (field === 'instructions') {
      const newList = [...instructions];
      newList[id].value = value;
      setInst(newList);
    }
    else if (field === 'notes') {
      const newList = [...notes];
      newList[id].value = value;
      setNote(newList);
    }
  }

  function removeField(id, field, value) {
    let workingList = [];

    console.log('val',value);

    const newList = [];

    if (field === 'ingrediants') {
      for (let i = 0; i < ingrediants.length; i++) {
        if (i !== id) newList.push(ingrediants[i]);
      }
      setIng(newList);
      return;
    }

    if (field === 'instructions') {
      for (let i = 0; i < instructions.length; i++) {
        if (i !== id) newList.push(instructions[i]);
      }
      setInst(newList);
      return;
    }

    if (field === 'notes') {
      for (let i = 0; i < notes.length; i++) {
        if (i !== id) newList.push(notes[i]);
      }
      setNote(newList);
      return;
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

    // handle errors for missing fields
    if (!recipeToSend.name) {
      setErr('please name your recipe');
      return;
    }
    if (recipeToSend.ingrediants[0] === '' || recipeToSend.instructions[0] === '') {
      setErr("enter your instructions & ingrediants");
      return;
    }
  
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

  const data =[{"name":"test1"},{"name":"test2"}];

  return (
    <div id='submitRecipe'>
      <form method='POST' action='/recipes' className='submitRecipe' onSubmit={onSubmit}>
        SUBMIT RECIPE<br></br>
        <input name="name" type="text" placeholder="recipe name"></input><br></br>

        <label>Type</label>
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
        <ul>
        {
          ingrediants.map(function(d, idx) {
            return (<li key={idx}><AddedField id={idx} updateFieldVal={updateFieldVal} fieldSection='ingrediants' filedValue={d.value} removeField={removeField} hideX={d.hideX}/></li>)
          })
        }
        </ul>

        <button type="button" onClick={addIngrediant}>ADD</button><br></br><br></br>


        instructions<br></br>
        <ol>
        {
          instructions.map(function(d, idx) {
            return (<li key={idx}><AddedField id={idx} updateFieldVal={updateFieldVal} fieldSection='instructions' filedValue={d.value} removeField={removeField} hideX={d.hideX} textArea='true'/></li>)
          })
        }
        </ol>
        <button type="button" onClick={addInstruction}>ADD</button><br></br><br></br>

        notes<br></br>
        <ol>
        {
          notes.map(function(d, idx) {
            return (<li key={idx}><AddedField id={idx} updateFieldVal={updateFieldVal} fieldSection='notes' filedValue={d.value} removeField={removeField} hideX={d.hideX} textArea='true'/></li>)
          })
        }
        </ol>
        <button type="button" onClick={addNote}>ADD</button><br></br><br></br>

        <div className='errorMsg'>{err}<br></br></div>
        <input type="submit" id='submitRecipeButton' value="SUBMIT" ></input>
      </form>
      <Nav toSubmit={props.toSubmit} toList={props.toList} toFav={props.toFav} toFriends={props.toFriends} />
    </div>
  );
}



export default Submit;