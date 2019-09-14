//import libraries 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import PasswordMask from 'react-password-mask';

export default class UserSignUp extends Component {
  //sets state
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  render() {
    //Set state for UserSignUp 
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <div><input id="firstName" name="firstName" type="text" value={firstName} onChange={this.change} placeholder="First Name" /></div>
                  <div><input id="lastName" name="lastName" type="text" value={lastName} onChange={this.change} placeholder="Last Name" /></div>
                  <div><input id="emailAddress" name="emailAddress" type="text" value={emailAddress} onChange={this.change} placeholder="Email Address" /></div>
                  <div><PasswordMask id="password" name="password" type="text" value={password} onChange={this.change} placeholder="Password" /></div>
                  <div><PasswordMask id="confirmPassword" name="confirmPassword" type="text" value={confirmPassword} onChange={this.change} placeholder="Confirm Password" /></div>
                </React.Fragment>
              )} 
            />
          </div>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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
  //submits user input
  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    let user = {};

    if (password !== confirmPassword) {
      this.setState({
        errors: ["passwords do not match"]
      })
      return;
    } else {
    // Create course variable(instance)
      user = {
        firstName,
        lastName,
        emailAddress,
        password
      };
    }

    //calls createUser function with given user data and credentials
    context.data.createUser(user)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        context.actions.signIn(emailAddress, password)
        .then(() => {
          this.props.history.push('/authenticated');    
        });
      }
    })
    .catch((err) => {
      //throw an error to console for developer debugging purposes
      console.log(err);
      this.props.history.push('/error');
    });
  }
  //sends user back to index (home)
  cancel = () => {
    this.props.history.push('/');
  }
}
