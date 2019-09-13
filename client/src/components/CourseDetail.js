import apiBaseUrl from '../config.js';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class CourseDetail extends Component {
  //set state for app
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      materials: null,
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
      this.userCourseInfo();
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }

  userCourseInfo = (course = this.state.course) => {
    if (course.User !== undefined) {
      let user = `${course.User.firstName} ${course.User.lastName}`         
      this.setState({
        fullName: user
      })
    }

    if (course.materialsNeeded !== undefined) {
      let list = course.materialsNeeded
                 .split('\n')
                 .map((item, i) => 
                   React.createElement('li', {key: i}, item.replace('*', '')),
                 )
      this.setState({
        materials: list
      })
    }
  }

  displayButtons = () => {
    const { authUser } = this.props.context;
    const { authenticatedUser } = this.props.context;

    if (authUser && (authenticatedUser.userId === this.state.course.userId)) {
      return (
        <React.Fragment>
          <span>
            <Link className="button" to={"/course-detail/"+this.state.course.id}>Update Course</Link>
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
              {this.state.course.description}
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
                    {this.state.materials}
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

