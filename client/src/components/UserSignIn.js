//import libraries 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  //Set initial state for UserSignIn 
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <div><input id="username" name="username" type="text" value={username} onChange={this.change} placeholder="User Name" /></div>
                <div><input id="password" name="password" type="password" value={password} onChange={this.change} placeholder="Password" /></div>                
              </React.Fragment>
            )} 
          />
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
  //sets user input to state variables 
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
  //submits user input. 
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    const { username, password } = this.state;
    //calls SignIn function with given user data and credentials
    context.actions.signIn(username, password)
    .then((user) => {
      if (user === null) {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ] };
        });
      } else {
        this.props.history.push(from);
      }
    })
    .catch((error) => {
      console.error(error);
      this.props.history.push('/error');
    });
  }
  //sends user back to index (home)
  cancel = () => {
    this.props.history.push('/');
  }
}
