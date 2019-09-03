//Flickr's Api key
import apiPath from './config.js';
//import the libraries needed for this project
import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Nav from './components/Nav'
import Main from './components/Index'
import CourseDetail from './components/CourseDetail'
import NotFound from './components/NotFound'



export default class App extends Component {
  //set state for app
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    //run this function at initialization
    this.apiSearch();
  }

  //obtain data using axios 
  apiSearch = (query = 'courses', istrue = false) => {
    console.log('queeeryryryryryry', query);
    axios.get(`${apiPath}/${query}`)
    .then(response => {
      this.setState({
        //set data to imgs state
        data: response.data
      });
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      //Add routes
      <BrowserRouter>
          <div>
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <Nav onClick={this.apiSearch} />
                <hr/>
              </div>  
            </div>
            <Switch>
              <Route exact path="/" render={ () => <Main title="Main-Page" data={this.state.data} /> } /> 
              <Route exact path="/course-detail/:id/:course" render={ (props) => <CourseDetail {...props} title="Course-Detail" search={this.apiSearch("courses/" + props.match.params.id)} data={this.state.data}/> } /> 
              <Route component={NotFound} />
            </Switch>  
          </div> 
      </BrowserRouter>
    );
  }
              // <Route exact path="/course-detail/:id/:course" render={ (props) => <CourseDetail {...props} title="Course-Detail" search={this.apiSearch} data={this.state.data}/> } /> 

}
