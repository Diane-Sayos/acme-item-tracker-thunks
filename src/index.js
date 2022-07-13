import React, { Component } from 'react';
//import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Nav from './Nav';
import Users from './Users';
import Things from './Things';
import Home from './Home';
import store from './store';
import { Provider, connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';

const root = createRoot(document.querySelector('#app'));

class _App extends Component{
  async componentDidMount(){
    try {
      this.props.loadData();
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    return (
      <div>
        <Route path='/:view?' component={ Nav } />
        <Route exact path='/' component={ Home } />
        <Route path='/users/:id?' component={ Users } />
        <Route path='/things/:id?' component={ Things } />
      </div>
    );
  }
}


const mapDispatch = (dispatch)=> {
  return {
    loadData: async()=> {
      const responses = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/things'),
      ]);
      dispatch({
        type: 'SET_USERS',
        users: responses[0].data
      });
      dispatch({
        type: 'SET_THINGS',
        things: responses[1].data
      });
    }
  };
};
const mapStateToProps = state => {
  return {
  };
};

const App = connect(mapStateToProps, mapDispatch)(_App);


root.render(<Provider store={ store }>
  <Router>
  <App />
  </Router>
  </Provider>);
/*
const root = document.querySelector('#app');
render(React.createElement('hr'), root);
*/