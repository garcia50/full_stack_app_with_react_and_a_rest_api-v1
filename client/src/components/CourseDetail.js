//import libraries
import apiBaseUrl from '../config.js';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";


export default class CourseDetail extends Component {
  //set state for app
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      fullName: ''
    };
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
        course: response.data
      });
      //call userCourseInfo function after api call
      this.userCourseInfo();
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }
  //calls api and retieve user info
  userCourseInfo = (course = this.state.course) => {
    if (course.User !== undefined) {
      let userFullname = `${course.User.firstName} ${course.User.lastName}`         
      this.setState({
        fullName: userFullname
      })
    }
  }
  //displays create and delete buttons if authenticated user exist
  displayButtons = () => {
    const { authUserPassword } = this.props.context;
    const { authenticatedUser } = this.props.context;
    //if statement to display buttons
    if (authUserPassword && (authenticatedUser.userId === this.state.course.userId)) {
      return (
        <React.Fragment>
          <span>
            <Link className="button" to={"/courses/"+this.state.course.id+"/update"}>Update Course</Link>
            <Link className="button" to={"/delete-course/"+this.state.course.id}>Delete Course</Link>
            <Link className="button button-secondary" to="/">Return to List</Link>
          </span>
        </React.Fragment>
      )
    } else {
      return (
        <span>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </span>
      )
    } 
  }

  render() {
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds" >
            <div className="grid-100">
              { this.displayButtons() }
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.fullName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

