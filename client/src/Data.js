//import the config file to access api endpoint path
import apiBaseUrl from './config';
//Data class/"helper class"
//Asynchronous functions that calls the api and retrieve data
export default class Data {
  //Passing data to api
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    //Passing body-data to option hash object
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    //Passing credentials-data to option hash object
    if (requiresAuth) {    
      options.headers['Authorization'] = `Basic ${credentials}`;
    }

    return fetch(url, options);
  }

  async getUser(credentials) {
    const response = await this.api('/users', 'GET', null, true, credentials);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse(course, credentials) {
    const response = await this.api('/courses', 'POST', course, true, credentials);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(course, courseId, credentials) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, credentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(courseId, credentials) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, credentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}

