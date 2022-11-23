import React, { useState } from 'react';


function AddedField(props) {

  let storedVal = '';
  let xButton = [ <button type="button" onClick={()=>{props.removeField(props.id, props.fieldSection, storedVal)}}>X</button> ];
  if (props.hideX) xButton = [];
  let inputObj = [
    <input
      value={props.filedValue}
      className='addedField'
      id={props.fieldSection + '_' + props.id}
      name={props.fieldSection}
      onChange={event => {storedVal=event.target.value; props.updateFieldVal(props.id, props.fieldSection, event.target.value)}}
      type="text">
    </input>];
    
  if (props.textArea) inputObj =[
    <textarea
      value={props.filedValue}
      className='addedField'
      id={props.fieldSection + '_' + props.id}
      name={props.fieldSection}
      multiline={true}
      onChange={event => {storedVal=event.target.value; props.updateFieldVal(props.id, props.fieldSection, event.target.value)}}
      onSubmit={event => {event.stopPropagation(); event.preventDefault}}
      type="text">
     </textarea>
  ];
  console.log('textArea', props.textArea);
  return (
    <div className='addedFieldContainer'>
      {/* <input value={props.filedValue} className='addedField' id={props.fieldSection + '_' + props.id} name={props.fieldSection} onChange={event => {storedVal=event.target.value; props.updateFieldVal(props.id, props.fieldSection, event.target.value)}} type="text"></input> */}
      {inputObj}
      {xButton}
    </div>
  );
}


export default AddedField;