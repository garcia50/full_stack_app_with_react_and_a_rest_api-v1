//import the config file to access api endpoint path
import apiBaseUrl from '../config.js';
//import the libraries
import React, { Component } from 'react';
import Course from './Course'
import axios from 'axios';

export default class Courses extends Component {
  //set state for app
  constructor() {
    super();
    this.state = {
      // data: [],
      courses: null
    };
  }

  componentDidMount() {
    //run this function at initialization
    this.apiSearch();
  }

  //obtain data using axios 
  apiSearch = (query = 'courses', istrue = false) => {
    // console.log('queeeryryryryryry', query);
    axios.get(`${apiBaseUrl}/${query}`)
    .then(response => {
      this.setCourses(response.data);
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }

  setCourses = (data) => {
    let allCourses;
    //maps through courses then passes data to Courses component
    if (data.length > 0) {
      allCourses = data.map(course => 
        <Course
          key={course.id}
          id={course.id}
          title={course.title}
        />  
      );
    }
    this.setState({
      //set data to app state
      courses: allCourses
    });
  }


  render() {
    return (
      //Displays courses onto page
      <div className="bounds">
        {this.state.courses}
        <div className="grid-33">
          <a className="course--module course--add--module" href="courses/create">
            <h3 className="course--add--title"><svg 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                x="0px" y="0px"
                viewBox="0 0 13 13" 
                className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a>
        </div>
      </div>
    )
  }
}

    