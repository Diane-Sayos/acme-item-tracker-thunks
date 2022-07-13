import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';




const Nav = ({ users, things, match })=> {
  const view = match.params.view;

  return (
    <nav>
      <Link to='/' className={ !view  ? 'selected': ''}>Home</Link>
      <Link to='/things' className={ view === 'things' ? 'selected': ''}>Things ({ things.length })</Link>
      <Link to='/users' className={ view === 'users' ? 'selected': ''}>Users ({ users.length })</Link>
    </nav>
  );
}

const mapStateToProps = (state)=> {
  return state;
};

export default connect(mapStateToProps)(Nav);