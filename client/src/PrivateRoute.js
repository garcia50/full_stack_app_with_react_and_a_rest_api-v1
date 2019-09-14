import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    //Creating routes that require an authenticated user - private route
    <Consumer>
      {context => (
        <Route
          {...rest}
          //If authenticated user present, proceed through App components
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              //If no authenticated user present, blocks access through App components
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};