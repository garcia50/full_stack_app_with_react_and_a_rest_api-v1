//import libraries 
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      //create nav element and append NavLink's
      <nav>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    )
  }
}