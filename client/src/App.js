//import the libraries needed for app
import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//import components 
import Header from './components/Header';
import Courses from './components/Courses'
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
  render() {
    return (
      //Add routes
      <BrowserRouter>
          <div>
            <HeaderWithContext />
            <Switch>
              <Redirect exact from="/" to='/courses' />
              <Route exact path="/courses" component={Courses} /> } /> 
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
