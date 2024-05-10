import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class DisplayReviews extends React.Component{

  state = {
    courses: [],
    allCourses: [],
    reviews : [],
    allReviews: [],
    header: '',
    body: '',
    clicked: false,
    avg: 0,
    filterLevel: 0,
    filterCode: '',
  };

  filterCourses = (course) => {
    console.log(this.state.courses)
    return((this.state.filterLevel === 0 || course.CourseLevel === this.state.filterLevel) && (this.state.filterCode === '' || course.CourseProgram === this.state.filterCode));
  }

    // if (this.state.filterCode !== ''){
    //   this.setState({courses : this.state.courses.map(
    //     course => {
    //       if (course.CourseProgram === this.state.filterCode) {
    //         console.log(course.CourseProgram, this.state.filterCode)
    //         return (course)
    //       }
    //     }  
    //   )});
    // }
    // if (this.state.filterLevel !== 0){
    //   this.setState({courses : this.state.courses.map(
    //     course => {
    //       if (course.CourseLevel === this.state.filterLevel) {
    //         console.log(course.CourseLevel, this.state.filterLevel)
    //         return (course)
    //       }
    //     }  
    //   )});
    // }
    // console.log(this.state.courses)


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
        this.setState({allCourses : courses})
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
    return(<h3/>)
  }

  render(){
      return(
      <div className="thing">
        <h1>Rate that Course!</h1>
        <p>Welcome to the reviews section of rate that course! Click any of the below courses in order to see how students feel about it.</p>
        <p>Select filters and click the button below to filter the shown courses.</p>

        <select>
          <option key="404" onClick={() => this.setState({ filterLevel : 0})}>Course Level</option>
          <option key="100" onClick={() => this.setState({ filterLevel : 100})}>100</option>
          <option key="200" onClick={() => this.setState({ filterLevel : 200})}>200</option>
          <option key="300" onClick={() => this.setState({ filterLevel : 300})}>300</option>
          <option key="400" onClick={() => this.setState({ filterLevel : 400})}>400</option>
        </select>

        <select name="course">
          <option key="404" onClick={() => this.setState({ filterCode : ''})}>Course Program</option>
          <option key="CISC" onClick={() => this.setState({ filterCode : "CISC"})}>CISC</option>
          <option key="ELEC" onClick={() => this.setState({ filterCode : "ELEC"})}>ELEC</option>
        </select>
        <input type="submit" value="Filter" onClick={() => this.setState({courses : this.state.allCourses.filter(this.filterCourses)})}/>
        <br/>
        {this.state.courses.map(course => (
          <button key={course.CourseID} type="button" onClick={() => this.changeDisplay(course.CourseCode, course.CourseProf, course.CourseDesc)} >{course.CourseCode}</button>
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