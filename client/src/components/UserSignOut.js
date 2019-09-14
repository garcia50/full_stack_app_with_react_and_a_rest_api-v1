import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  //calls signOut function 
  context.actions.signOut();
  //returns user back to index(homepage)
  return (
    <Redirect to="/" />
  );
}
