//import the libraries needed for context
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
//Context allows us to dynamically pass data through coponents 
const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    authUserPassword: Cookies.getJSON('authUserPassword') || null
  };

  constructor() {
    //set state for context
    super();
    this.data = new Data();
  }

  render() {
    //set/obtain authuser & data for cookies as well as data file objects 
    const { authenticatedUser } = this.state;
    const { authUserPassword } = this.state;
    const value = {
      authenticatedUser,
      authUserPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    //Pass data through context/place in higher order. Allow App to have access to context data
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
  //Authenticate user with given credentials 
  signIn = async (emailAddress, password) => {
    const encodedCredentials = btoa(`${emailAddress}:${password}`);
    this.setState({authUserPassword: encodedCredentials})
    //Api call - retrieves user
    const user = await this.data.getUser(encodedCredentials);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authUserPassword: encodedCredentials
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
      Cookies.set('authUserPassword', JSON.stringify(encodedCredentials), cookieOptions);
    }
    return user;
  }
  //Remove and reset cookies to null(original state)
  signOut = () => {
    this.setState({ authenticatedUser: null, authUserPassword: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('authUserPassword');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      //Setting/placing context consumer in a higher order than app to dynamically pass data through app itself
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
