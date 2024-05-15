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
    dropdowns: [],
  };

  filterCourses = (course) => {
    return((this.state.filterLevel === 0 || (course.CourseLevel > this.state.filterLevel - 1 && course.CourseLevel < this.state.filterLevel + 100)) && (this.state.filterCode === '' || course.CourseProgram === this.state.filterCode));
  }

  changeDisplay (code, title, desc){
    const clicked = true;
    this.setState({ clicked });
    const header = code + ": " +title;
    this.setState({ header });
    const body = desc;
    this.setState({ body });
    this.setState({reviews : this.state.allReviews.map(
      review => {
        if (review.ReviewCourse === code) {
          return ((<div><p>{review.ReviewContent}</p><p>Difficulty rating: {review.ReviewDifficulty} /5, Overall rating: {review.ReviewScore} /5.</p><p>Review left by: {review.ReviewAuthor} on {review.ReviewDate}</p><br/></div>))
        }
      }  
    )});
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/courses')
      .then(res => {
        const courses = res.data;
        var codes = []
        this.setState({ courses });
        this.setState({allCourses : courses})
        courses.map(course => {
          var exists = codes.includes(course.CourseProgram);
          if (!exists) {
            codes.push(course.CourseProgram);
          }
        })
        const temp = codes.map(code => {
          return (<option key={code} onClick={() => this.setState({ filterCode : code})}>{code}</option>)
        })
        this.setState({dropdowns : temp})
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
  }

  render(){
      return(
      <div className="wrapper-main">
        <div className='topnav'>
          <a href="/writereview">Write a Review</a>
          <a class="active" href="#reviews">Read Reviews</a>
          <a href="/login">Login/Signup</a>
          <a href="/">Home</a>
        </div>
        <h1 className="header-home">Read Reviews!</h1>
        <p className='paragraph-home'>Welcome to the reviews section of rate that course! Click any of the below courses in order to see how students feel about it.</p>
        <p className='paragraph-home'>Select filters and click the button below to filter the shown courses.</p>

        <div>
          <select className='filter-courses'>
            <option key="404" onClick={() => this.setState({ filterLevel : 0})}>Course Level</option>
            <option key="100" onClick={() => this.setState({ filterLevel : 100})}>100</option>
            <option key="200" onClick={() => this.setState({ filterLevel : 200})}>200</option>
            <option key="300" onClick={() => this.setState({ filterLevel : 300})}>300</option>
            <option key="400" onClick={() => this.setState({ filterLevel : 400})}>400</option>
            <option key="500" onClick={() => this.setState({ filterLevel : 500})}>500</option>
          </select>

          <select name="course">
            <option key="404" onClick={() => this.setState({ filterCode : ''})}>Course Program</option>
            {this.state.dropdowns}
          </select>
          <input type="submit" value="Filter" onClick={() => this.setState({courses : this.state.allCourses.filter(this.filterCourses)})}/>
        </div>
        <br/>
        {this.state.courses.map(course => (
          <button key={course.CourseID} type="button" onClick={() => this.changeDisplay(course.CourseCode, course.courseTitle, course.CourseDesc)} >{course.CourseCode}</button>
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