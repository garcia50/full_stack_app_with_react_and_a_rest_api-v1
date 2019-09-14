import React, { Component } from 'react';
import apiBaseUrl from '../config.js';
import Form from './Form';
import axios from 'axios';
var slugify = require('slugify')


export default class UpdateCourse extends Component {
  state = {
    course: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  componentDidMount() {
    //run this function at initialization
    this.apiSearch("courses/" + this.props.match.params.id);
  }

  apiSearch = (query = 'courses') => {
    axios.get(`${apiBaseUrl}/${query}`)
    .then(response => {
      //set data to imgs state
      this.setState({
        course: response.data,
        title: response.data.title,
        description: response.data.description,
        estimatedTime: response.data.estimatedTime,
        materialsNeeded: response.data.materialsNeeded
      });

    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }


  render() {
    const { authenticatedUser } = this.props.context;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} placeholder={title} value={title} /></div>
                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" onChange={this.change} placeholder={description} value={description}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            onChange={this.change} placeholder={estimatedTime} value={estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} placeholder={materialsNeeded} value={materialsNeeded}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} 
          />
        </div>
      </div>
    )
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

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // Update course
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    const courseId = this.state.course.id
    const credentials = context.authUserPassword;

    context.data.updateCourse(course, courseId, credentials)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        this.props.history.push('/');
        window.location.reload();
      }
    })
    .catch((err) => {
      this.props.history.push('/error');
    });
  }

  cancel = () => {
    this.props.history.push(`${this.state.course.id}/${slugify(this.state.course.title, '_')}`);
  }
}
