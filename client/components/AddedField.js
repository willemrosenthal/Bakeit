import React, { useEffect, useState } from 'react';


function AddedField(props) {
  let xButton = [ <button type="button" onClick={()=>{props.removeField(props.id, props.fieldSection)}}>X</button> ];
  if (props.hideX) xButton = [];
  return (
    <div className='addedFieldContainer'>
      <input className='addedField' id={props.fieldSection + '_' + props.id} name={props.fieldSection} type="text"></input>
      {xButton}
    </div>
  );
}


export default AddedField;