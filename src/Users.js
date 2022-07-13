import React from 'react';
import { connect } from 'react-redux';
import { removeThingFromUser, updateUserRank, createUser, deleteUser } from './store';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import axios from 'axios';


const Users = ({ users, createUser, deleteUser, things, removeThingFromUser, updateUserRank, match })=> {
  const userId = match.params.id*1;
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>Add A User</button>
      <table className='users'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>User Rank</th>
            <th>Set Rank</th>
            <th>Thing (Rank)</th>
            <th>Delete User</th>
          </tr>
          {users.filter(user => !userId || user.id === userId).map(user => {
            return (
              <tr key={ user.id }>
                <td><Link to={`/users/${userId ? '': user.id}`}>{ user.name }</Link></td>
                <td>{ user.ranking }</td>
                <td><button onClick={()=> updateUserRank(user, -1)}>-</button><button onClick={()=> updateUserRank(user, 1)}>+</button></td>
                <td>{things.filter( thing => thing.userId === user.id).map(thing => {
                  if(thing.userId === user.id){
                    return (
                      <p key={ thing.id }>
                        { thing.name } ({ thing.ranking })
                        <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                      </p>
                    )
                  }
                })}</td>
                <td><button onClick={ ()=> deleteUser(user)}>x</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatch = (dispatch, otherProps)=> {
  const { history } = otherProps;
  return {
    createUser: () => {
      dispatch(createUser(history));
    },
    removeThingFromUser: (thing)=> {
      dispatch(removeThingFromUser(thing));
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user, history));
    },
    updateUserRank: (user, dir)=> {
      user = {...user, ranking: user.ranking + dir};
        dispatch(updateUserRank(user));
    }
  };
}
export default connect(mapStateToProps, mapDispatch)(Users);