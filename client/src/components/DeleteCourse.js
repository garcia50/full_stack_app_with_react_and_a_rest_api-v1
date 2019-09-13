import React, { Component } from 'react';
import axios from 'axios';
import apiBaseUrl from '../config.js';
import { Redirect } from 'react-router-dom';

export default class DeleteCourse extends Component {
 
  componentDidMount() {
    //run this function at initialization
    this.apiSearch("courses/" + this.props.match.params.id);
  }

  apiSearch = (query = 'courses') => {
    axios.get(`${apiBaseUrl}/${query}`)
    .then(response => {
      const authUserId = this.props.context.authenticatedUser.userId
      const courseUserId = response.data.userId

      if (authUserId === courseUserId) {
        this.props.context.data.deleteCourse(response.data.id, this.props.context.authUser)
        .then( errors => {
          if (errors.length > 0) {
            console.log(errors);
          } else {
            this.props.history.push('/');
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push('/');
        });
      }
    })
    .catch(error => {
      //throw an error to console for developer debugging purposes
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}
