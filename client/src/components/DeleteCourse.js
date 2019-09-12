import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// export default ({context}) => {
export default class DeleteCourse extends Component {
  //set state for app
  constructor(props) {
    super(props);
    this.state = {
      courseId: props.match.params.id,
      authUser: props.context.authUser,
      context: props.context.data.deleteCourse
    };
  }

  render() {
    this.state.context(this.state.courseId, this.state.authUser)
    return (
      <Redirect to="/" />
    );
  }
}
