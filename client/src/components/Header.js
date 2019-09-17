//import libraries
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;
  return (
    <div className="header">
      <div className="bounds">
        <Link to='/'>
          <h1 className="header--logo">Courses</h1>
        </Link>
        <nav>
          {authUser ? (
            //Authenticated user present
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            //Authenticated user not present
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header;
