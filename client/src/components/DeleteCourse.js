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
    this.props.context.data.deleteCourse(this.state.courseId, this.state.authUser)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        this.props.history.push('/');
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/error');
    });
    return (
      <Redirect to="/" />
    );
  }
}
