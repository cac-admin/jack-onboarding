import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class DisplayReviews extends React.Component{

  state = {
    courses: [],
    reviews : [],
    allReviews: [],
    header: '',
    body: '',
    clicked: false,
    avg: 0,
  };


  changeDisplay (code, prof, desc){
    const clicked = true;
    this.setState({ clicked });
    const header = code;
    this.setState({ header });
    const body = desc + ' This course is taught by: ' + prof + '.';
    this.setState({ body });
    this.setState({reviews : this.state.allReviews.map(
      review => {
        if (review.ReviewCourse === code) {
          return ((<div><p>{review.ReviewContent}</p><br/><p>Difficulty rating: {review.ReviewDifficulty} /5, Overall rating: {review.ReviewScore} /5.</p><br/><p>Review left by: {review.ReviewAuthor} on {review.ReviewDate}</p></div>))
        }
      }  
    )});
  }





  componentDidMount(){
    axios.get('http://localhost:8000/api/courses')
      .then(res => {
        const courses = res.data;
        this.setState({ courses });
      });
    axios.get('http://localhost:8000/api/reviews')
      .then(res => {
        const temp = res.data;
        this.setState({ allReviews : temp });
      });
  }

  showReviewsHeader(){
    if (this.state.clicked){
      return (<h3>Reviews</h3>)
    }
    return(<h3> </h3>)
  }


  render(){
      return(
      <div>
        <h1>Rate that Course!</h1>
        <p>Welcome to the reviews section of rate that course! Click any of the below courses in order to see how students feel about it.</p>
        {this.state.courses.map(courses => (
          <button key={courses.CourseID} type="button" onClick={() => this.changeDisplay(courses.CourseCode, courses.CourseProf, courses.CourseDesc)} >{courses.CourseCode}</button>
        ))}
        <br/><br/>
        <h3>
          {this.state.header}
        </h3>
        <p>
          {this.state.body}
        </p>
        {this.showReviewsHeader()}
        {this.state.reviews}
        <Link to="/">Return to the home page</Link>
      </div>  
    );
  }
}