// import React from 'react';
import apiBaseUrl from '../config.js';
import axios from 'axios';


import React, { Component } from 'react';

export default class CourseDetail extends Component {
// const CourseDetail = (props) => {
 
  // let course;
  constructor() {
    super();
    this.state = {
      course: []
    };
  }

  componentDidMount() {
    //run this function at initialization
    this.apiSearch("courses/" + this.props.match.params.id);
  }

  apiSearch = (query = 'courses') => {
    // console.log('queeeryryryryryry', query);
    axios.get(`${apiBaseUrl}/${query}`)
    .then(response => {
      //set data to imgs state
      this.setState({
        course: response.data
      });
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }

  // console.log('proporporporporrpp', course);


  render() {
    console.log("yayayayayayyaya", this.state.course);
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds" >
            <div className="grid-100">
              <span>
                <a className="button" href={'course-detail/' + 'update-course'}>Update Course</a>
                <a className="button" href="#">Delete Course</a>
              </span>
              <a className="button button-secondary" href="/">Return to List</a>
              </div>
          </div>
        </div>
        <div className="bounds course--detail" >
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By Joe Smith</p>
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
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
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

// export default CourseDetail;


