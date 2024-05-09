import React from 'react';
import axios from 'axios';

export default class DisplayReviews extends React.Component{

  state = {
    courses: [],
    display: "Placeholder",
  };

  changeDisplay(code, prof, desc){
    const display = code + prof + desc;
    this.setState({ display });
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/courses')
      .then(res => {
        const courses = res.data;
        this.setState({ courses });
      });
  }

  render(){
      return(
      <div>
        <h1>Rate that Course!</h1>
        <p>Welcome to the reviews section of rate that course! Click any of the below courses in order to see how students feel about it.</p>
        {this.state.courses.map(courses => (
          <button key={courses.CourseID} onClick={() => this.changeDisplay(courses.CourseCode, courses.CourseProf, courses.CourseDesc)} >{courses.CourseCode}</button>
        ))}
        <br/>
        {this.state.display}
      </div>  
    );
  }
}