import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }


  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} placeholder="Course title..." value={title} /></div>
                    <p>By {authUser.firstName} {authUser.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" onChange={this.change} placeholder="Course description..." value={description}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            onChange={this.change} placeholder="Hours" value={estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} placeholder="List materials..." value={materialsNeeded}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} 
          />
        </div>
      </div>
    );
  } 

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const userId = context.authenticatedUser.userId;
    const credentials = context.authUser;
    // const emailAddress = context.authenticatedUser.emailAddress;
    // const password = context.authenticatedUser.password;
    console.log('contextxtxtxtxtxtxtxtxt', context)
    console.log('userIdr11111111111', context.authenticatedUser)
    console.log('userIdrrrrrrrrrrr', userId)

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // Create course
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    context.data.createCourse(course, credentials)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        this.props.history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/error');
    });
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
