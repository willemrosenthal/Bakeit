import React, { useState } from 'react';


function AddedField(props) {

  let storedVal = '';
  let xButton = [ <button type="button" onClick={()=>{props.removeField(props.id, props.fieldSection, storedVal)}}>X</button> ];
  if (props.hideX) xButton = [];
  return (
    <div className='addedFieldContainer'>
      <input value={props.filedValue} className='addedField' id={props.fieldSection + '_' + props.id} name={props.fieldSection} onChange={event => {storedVal=event.target.value; props.updateFieldVal(props.id, props.fieldSection, event.target.value)}} type="text"></input>
      {xButton}
    </div>
  );
}


export default AddedField;