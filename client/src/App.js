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
    this.performSearch();
  }

  //obtain data using axios 
  performSearch = (query = 'courses', istrue = false) => {
    axios.get(`${apiPath}/${query}`)
    .then(response => {
      this.setState({
        //set data to imgs state
        res: response
      });
        console.log('respoooooonseeeeee', response);
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
                <Nav onClick={this.performSearch} />
                <hr/>
              </div>  
            </div>
            <Switch>
              <Route exact path="/" render={ () => <Main title="Courses" /> } /> 
              <Route component={NotFound} />
            </Switch>  
          </div> 
      </BrowserRouter>
    );
  }

}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
