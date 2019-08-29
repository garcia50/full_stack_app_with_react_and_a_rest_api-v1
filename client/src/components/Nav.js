//import libraries 
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      //create nav element and append NavLink's
      <nav>
        <NavLink to="/sign-up.html">Sign Up</NavLink>
        <NavLink to="/sign-in.html">Sign In</NavLink>
      </nav>
    )
  }
}