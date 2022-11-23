import React, { useState } from 'react';
import Emoji from './Emoji';
import axios from 'axios';

function Vote(props) {

  const [makingRequest, setMakingRequest] = useState(false);
  const [err, setErr] = useState('');

  const upIcon = '0x2B06';
  const downIcon = '0x2B07';

  console.log('PROPS', props)

  const submitVote = async (dir) => {

    console.log('vote dir:', dir);

    // prevent multiple clicks while processsing
    if (makingRequest) console.log('making request still. this click wont do anything.');

    const v = {
      id: props.recipeId,
      up: dir > 0 ? props.up + 1 : props.up,
      down: dir < 0 ? props.down + 1 : props.down,
      aggregate: dir > 0 ? props.aggregate + 1 : props.aggregate -1,
      votes: props.votes + 1,
      served: true
    }

    console.log('sending vote:', v);
  
    setMakingRequest(true);
    try {
      // error if nothing there
      if (!props.recipeId) {
        throw 'missing data';
      }

      // prepare axios post
      const {data} = await axios.post('/recipes/' + props.recipeId, v, { headers: {'Content-Type': 'application/json', Accept: 'application/json',} } );
      // the data to send
      console.log('vote responce:', JSON.stringify(data));  
    } catch (err) {
      setErr(err.message);
    } finally {
      setMakingRequest(false);
      props.toList();
    }
  }

  return (
    <div className='vote'> 
      <div>vote</div>
      <div className='errorMsg'>{err}<br></br></div>
      <div className='upvote voteBtn' onClick={()=>submitVote(1)}>
        <div className='voteArr'><Emoji symbol={upIcon} /></div>
      </div>
      <div className='downvote voteBtn' onClick={()=>submitVote(-1)}>
        <div className='voteArr'><Emoji symbol={downIcon} /></div>
      </div>
    </div>
  );
}

export default Vote;