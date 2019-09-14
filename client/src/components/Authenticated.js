import React from 'react';

export default ({ context  }) => {
  //set authUser constant, retrieve data through context
  const authUser = context.authenticatedUser;
  return (
  //Display authenticated user
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your username is {authUser.emailAddress}.</p>
    </div>
  </div>
  );
}