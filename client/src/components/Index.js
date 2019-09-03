import React from 'react';
import Courses from './Courses'

const Main = (props) => {
  const courses_data = props.data
  let courses;

  if (courses_data.length > 0) {
    courses = courses_data.map(course => 
      <Courses
        key={course.id}
        id={course.id}
        title={course.title}
      />  
    );
  }

  return (
    <div className="bounds">
      {courses}
      <div className="grid-33">
        <a className="course--module course--add--module" href="create-course">
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

export default Main;


    