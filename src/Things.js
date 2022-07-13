import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import { updateThing } from './store';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Things = ({ things, users, deleteThing, increment, updateThing, match })=> {
  const thingId = match.params.id*1;
  console.log(thingId)
  const onChange = async(thing, ev) => {
    const userId = ev.target.value;
    const itemCount = things.filter(_thing => _thing.userId === userId*1);
    if(itemCount.length !== 3){
      updateThing(thing, userId)
    } else {
      const select = document.querySelector('#mySelect');
      select.value? thing.userId : '';
      alert("User is too weak to carry extra items. User need to hit the Gym!")
    }
  }
  return (
    <div>
      <h1>Things</h1>
      <ThingForm />
      <table className='things'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Owner</th>
            <th>Set Owner</th>
            <th>Adjust Rank</th>
            <th>Delete Thing</th>
          </tr>
          {things.filter(thing => !thingId || thing.id === thingId).map(thing => {
            const user = users.find(user => user.id === thing.userId) || {};
            return (
              <tr key={ thing.id }>
                <td><Link to={`/things/${thingId ? '': thing.id}`}>{ thing.name }</Link></td>
                <td> { thing.ranking }</td>
                <td>{ user.name || 'nobody' }</td>
                <td><div>
                 <select id='mySelect' value={ thing.userId || ''} onChange={ ev => onChange(thing, ev)}>
                   <option value=''>-- nobody --</option>
                   {
                    users.map( user => {
                      return (
                        <option id={ user.id } key={ user.id } value={ user.id }>{ user.name }</option>
                      );
                    })
                  }
                </select>
              </div></td>
                <td><button onClick={()=> increment(thing, -1)}>-</button>
                 <button onClick={()=> increment(thing, 1)}>+</button></td>
                <td><button onClick={ ()=> deleteThing(thing)}>x</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  },
  (dispatch, otherProps)=> {
    const { history } = otherProps
    return {
      updateThing: (thing, userId)=> {
        thing = {...thing, userId: userId * 1 };
        dispatch(updateThing(thing));
      },
      increment: (thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir};
        dispatch(updateThing(thing));
      },
      deleteThing: async(thing)=> {
        await axios.delete(`/api/things/${thing.id}`);
        dispatch({ type: 'DELETE_THING', thing });
        history.push('/things');
      }
    };
  }
)(Things);