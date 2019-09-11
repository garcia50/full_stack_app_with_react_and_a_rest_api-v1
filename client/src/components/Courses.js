//import the libraries
import React from 'react';
var slugify = require('slugify')

const Courses = ({ id, title, testit }) => {
  //create li element and use parameters to access info
  return (
    <div className="grid-33" key={id}>
      <a className="course--module course--link" id={id} href={'course-detail/' + id + '/' + slugify(title, '_')}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{title}</h3>
      </a>
    </div>
  );
}

export default Courses;