//import the config file to access api endpoint path
import apiBaseUrl from './config.js';
//import the libraries needed for app
import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
//import components 
import Header from './components/Header';
import Main from './components/Index'
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Authenticated from './components/Authenticated'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import DeleteCourse from './components/DeleteCourse'
import NotFound from './components/NotFound'
//import components through context to dynamically access context contents 
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);


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
    // console.log('queeeryryryryryry', query);
    axios.get(`${apiBaseUrl}/${query}`)
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
            <HeaderWithContext />
            <Switch>
              <Redirect exact from="/" to='/courses' />
              <Route exact path="/courses" render={ () => <Main title="Main-Page" data={this.state.data} /> } /> 
              <PrivateRoute path="/authenticated" component={AuthWithContext} />
              <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
              <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} /> 
              <Route path="/courses/:id/:course" component={CourseDetailWithContext} /> 
              <Route path="/delete-course/:id" component={DeleteCourseWithContext} /> 
              <Route component={NotFound} />
            </Switch>  
          </div> 
      </BrowserRouter>
    );
  }
}
